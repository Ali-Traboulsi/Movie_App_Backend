const dotenv = require("dotenv").config();

exports.database = {
    host: 'localhost',
    database: process.env.DB_NAME || "movie_app",
    username: process.env.DB_NAME,
    password: process.env.DB_PASS,
    dbUri: process.env.DB_URI || "movie_app"
};

exports.server = {
    port: process.env.PORT || 5000,
    url: process.env.URL || "http://localhost:"
};

exports.jwtCredentials = {
    secretKey: process.env.SECRET_KEY
};

exports.adminCredentials = {
    email: process.env.SENDER_EMAIL,
    password: process.env.SENDER_PASS,
};
