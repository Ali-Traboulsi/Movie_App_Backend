const ActorServices = require('../services/actor.service');

exports.createActor = async (req, res, next) => {
    try {
        const result = await ActorServices.createActor(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateActor = async (req, res, next) => {
    try {
        const actorId = req.params.actorId;
        const result = await ActorServices.updateActor(actorId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteActor = async (req, res, next) => {
    try {
        const actorId = req.params.actorId;
        const result = await ActorServices.deleteActor(actorId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllActors = async (req, res, next) => {
    try {
        const result = await ActorServices.getAllActors(req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getActorById = async (req, res, next) => {
    try {
        const actorId = req.params.actorId;
        const result = await ActorServices.getActorById(actorId, req.body);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
