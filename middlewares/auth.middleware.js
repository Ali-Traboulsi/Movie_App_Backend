const jwt = require("jsonwebtoken");

// import utils
const Error = require('../utils/error');
const Response = require('../utils/response');

// import config
const {jwtCredentials} = require("../config/config");


exports.isAuthenticated = async (req, res, next) => {
    try {
        // get the token from the authorization header in the req object
        const authHeader = req.get('Authorization');
        if (!authHeader) throw Error(401, "You Are Not Authenticated!");

        // extract the actual token from the authHeader
        const token = authHeader.split(" ")[1];
        if (!token) throw Error(401, "You Are Not Authenticated!");

        // verify and decode the token
        const decodedToken = jwt.verify(token, jwtCredentials.secretKey);
        if (!decodedToken) throw Error(401, "You Are Not Authenticated!");

        // extract user info
        req.userId = decodedToken.userId;
        req.user = decodedToken
        console.log(req.user);

        // execute the next middleware
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
};

exports.isAdmin = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).send({
                error: {
                    statusCode: 401,
                    message: "USer Not Authenticated"
                }
            })

        }

        if (!req.user.role.includes('admin') || !req.user.role) {
            return res.status(403).send({
                error: {
                    statusCode: 403,
                    message: "Forbidden Access"
                }
            })
        }

        next();
    } catch (err) {
        next(err)
    }
}


