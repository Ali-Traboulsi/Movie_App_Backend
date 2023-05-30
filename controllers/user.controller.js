const UserServices = require('../services/user.service');

exports.createUser = async (req, res, next) => {
    try {
        const result = await UserServices.createUser(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.updateUser(userId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.deleteUser(userId)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await UserServices.getAllUsers(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const result = await UserServices.getUserbyId(userId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
