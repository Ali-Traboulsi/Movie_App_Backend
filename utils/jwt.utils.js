const crypto = require("crypto");

// import utilities
const Error = require('./error');

const generateSecretKey = () => {
    try {
        // generate a random buffer
        const buffer = crypto.randomBytes(32);
        // convert to hexadecimal string
        const secretKey = buffer.toString('hex');
        console.log(`Successfully generated secret key: ${secretKey}`);
        return secretKey;
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

generateSecretKey();




