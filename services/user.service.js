const mongoose = require('mongoose');
const multer = require('multer');

// import models
const User = require('../models/user.model');
const Review = require('../models/review.model');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// create a new user
exports.createUser = async (body) => {
    try {
        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
            favorites: body.favorites,
            reviews: body.reviews,
            profileImage: body.profileImage
        });

        const result  = await user.save();
        if (!result) {
            throw Error(500, 'Error creating user. Server Error Occured!');
        }

        return Response(result, "Success creating user");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// update the user
exports.updateUser = async (userId, body) => {
    try {
        await User.UpdateOne(
            {_id: userId},
            {
                $set: {
                    name: body.name,
                    email: body.email,
                    password: body.password,
                    favorites: body.favorites,
                    reviews: body.reviews,
                    profileImage: body.profileImage
                }
            },
            { omitUndefined: true }
        );

        return Response(null, "Success updating user");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};


// delete the user
exports.deleteUser = async (userId) => {
    try {
        const result = await User.deleteOne({_id: userId});
        if (!result) {
            throw Error(500, 'Error deleting user. Server Error Occured!');
        }

        return Response(null, "Success deleting user");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// get the user by Id
exports.getUserbyId = async (userId) => {
    try {
        const user = await User
            .findOne({_id: userId})
            .populate('favorites')
            .populate('reviews');
        return Response(user, "Success getting user");

    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// get all users
exports.getAllUsers = async () => {
    try {
        const users = await User
            .find()
            .sort('created_at')
            .populate('favorites')
            .populate('reviews');
        return Response(users, "Success getting all users");

    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}
