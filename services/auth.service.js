// import dependencies
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const fs = require('fs');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// import config
const { jwtCredentials, adminCredentials, server }  = require("../config/config");

// models
const User = require("../models/user.model");

// relative dependencies
// const resetPassHtml = require('../templates/password-reset/reset-email.html');

// create a transport
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: adminCredentials.email.toString(),
        pass: adminCredentials.password.toString(),
    },
});

// sign in module
exports.signIn = async (body) => {
    try {
        const { email, password } = body;
        const user = await User.findOne({email: email});
        if (!user) throw Error(401, "Email or password is incorrect");

        // verify if user is blocked
        if (user.blocked) throw Error(401, "You are Blocked!");

        const isEqual = password === user.password;

        if (!isEqual) {
            if (user.nbOfAttempts >= 5) {
                await User.updateOne({email: email}, {$set: {blocked: true}});
                throw Error(403, "You have exceeded the max number of attempts! Try again Later");
            }

            await User.updateOne({email: email}, { $set: { $inc: { nbOfAttempts: 1 }}});
            throw Error(401, "Email or password is incorrect");
        }

        // generate the jwt token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role,
            },
            jwtCredentials.secretKey,
        )

        return Response({token: token, userId: user._id.toString(), role: user.role}, 200, "Successfully logged in")

    }   catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// register Service
exports.signUp = async (body) => {
    try {
        const { name, email, password } = body;

        // check for missing fields
        if (!name || !email || !password) {
            throw Error(422, "You have missing fields!");
        }

        // check if the user already exist
        const oldUser = await User.findOne({email: email});
        if (oldUser) throw Error(422, "Account already exists");

        // create the new user
        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
        });

        const result = await user.save();
        if (!result) throw Error(500, "Server Error Occured! Couldn't Save User.");

        // send a welcome email
        console.log(adminCredentials.email)
        console.log(email)

        const message = {
            to: `${email}`,
            from: `${adminCredentials.email}`,
            subject: " SignUp Succeeded!",
            html: `<h2>Welcome ${name}</h2>`
        };

        const sendEmail = await transport.sendMail(message);

        return Response(result, 200, "User Successfully Registered!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// send Password Reset Link Service
exports.sendPassResetLink = async (body) => {
    try {
        const resetEmail = body.email;

        // check for valid user
        const user = await User.findOne({email: resetEmail});
        if (!user) throw Error(404, "User is not Registered! Please Register.");

        // generate the reset token
        const resetToken = jwt.sign(
            {
                email: body.email,
            },
            jwtCredentials.secretKey,
            {
                expiresIn: "2h",
            },
        );

        // update the user with reset token
        const updatedUser = await User.updateOne(
            {email: resetEmail},
            {
                $set: {
                    resetToken: resetToken,
                    resetTokenExpiry: Date.now() + 7200000,
                },
            },
        );

        // reset link
        const resetLink = `${server.url}${server.port}/user/reset-password/${resetToken}`;
        console.log(resetLink);

        // read the template file
        const resetPassHtmlTemplate = fs.readFileSync(`C:\\Users\\Admin\\Desktop\\Codi_Refreshment\\Assessment_Project\\Movie_App\\Backend\\templates\\password-reset\\reset-email.html`, 'utf-8');
        const htmlBody = resetPassHtmlTemplate.replace('{reset-link}', resetLink).replace('reset-token-expiry', '2h');

        // send the reset token to the user email
        await transport.sendMail({
            to: `${resetEmail}`,
            from: `${adminCredentials.email}`,
            subject: `Password Reset Request`,
            html: htmlBody,
        });

        return Response(undefined, 200, " Password reset link has been sent successfully");

    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};


// Validate the Sent Token Service
exports.validateResetToken = async (resetToken) => {
    try {
        const result = await User.findOne(
            {
                resetToken: resetToken,
                resetTokenExpiry: { $gt: Date.now() }
            },
        );
        if (!result) throw Error(404, "Reset Token Not Valid or Has Expired" );

        return Response(null, 200, "USer Successfully Found and Token is valid");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};


// Reset the Password Service
exports.resetPass = async (resetToken, body) => {
    try {
        const result = await User.findOneAndUpdate(
            {
                resetToken: resetToken,
                resetTokenExpiry: { $gt: Date.now() }
            },
            {
                $set: {
                    password: body.newPassword,
                },
                $unset: {resetToken: "", resetTokenExpiry: ""}
            },
        );
        if (!result) throw Error(500, "Error Updating Password!");
        return Response(null, 200, "Password Reset Successful");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};
