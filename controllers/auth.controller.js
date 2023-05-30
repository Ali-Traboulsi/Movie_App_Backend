const AuthService = require('../services/auth.service');

exports.signIn = async (req, res, next) => {
    try {
        const result = await AuthService.signIn(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.signUp = async (req, res, next) => {
    try {
        const result = await AuthService.signUp(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.sendPassResetLink = async (req, res, next) => {
    try {
        const result = await AuthService.sendPassResetLink(req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.validateResetToken = async (req, res, next) => {
    try {
        const resetToken = req.params.resetToken;
        const result = await AuthService.validateResetToken(resetToken);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.resetPass = async (req, res, next) => {
    try {
        const resetToken = req.params.resetToken;
        const result = await AuthService.resetPass(resetToken, req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};