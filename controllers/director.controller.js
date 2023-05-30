const DirectorServices = require('../services/director.service');

exports.createDirector = async (req, res, next) => {
    try {
        const result = await DirectorServices.createDirector(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateDirector = async (req, res, next) => {
    try {
        const directorId = req.params.directorId;
        const result = await DirectorServices.updateDirector(directorId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteDirector = async (req, res, next) => {
    try {
        const directorId = req.params.directorId;
        const result = await DirectorServices.deleteDirector(directorId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllDirectors = async (req, res, next) => {
    try {
        const result = await DirectorServices.getAllDirectors(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getDirectorById = async (req, res, next) => {
    try {
        const directorId = req.params.directorId;
        const result = await DirectorServices.getDirectorById(directorId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
