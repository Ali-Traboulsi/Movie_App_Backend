const mongoose = require('mongoose');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// import models
const Actor = require('../models/actor.model');
const Movie = require('../models/movie.model');

// create actor
exports.createActor = async (body) => {
    try {
        const actor = new Actor({
            name: body.name,
            age: body.age,
            gender: body.gender,
            biography: body.biography,
            movies: body.movies,
        })

        const result = await actor.save();
        if (!result) {
            throw Error(500, "Error Creating Actor. Server Error!")
        }
        return Response(result, "Success Creating Actor!");
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// update actor
exports.updateActor = async (actorId, body) => {
    try {
        await Actor.updateOne(
            {_id: actorId},
            {
                $set: {
                    name: body.name,
                    age: body.age,
                    gender: body.age,
                    biography: body.biography,
                    movies: body.movies,
                }
            },
            {omitUndefined: true},
        );

        return Response(null, "Success updating Actor!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// delete actor
exports.deleteActor = async (actorId) => {
    try {
        await Movie.updateMany(
            {actors: actorId},
            {$pull: {actors: actorId}}
        );
        const result = await Actor.findOneAndDelete({_id: actorId});
        if (!result) throw Error(404, "Actor not found!");
        return Response(null, "Success Deleting Actor");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get all actors
exports.getAllActors = async () => {
    try {
        const actors = await Actor
            .find()
            .populate('movies')
            .sort('created_at');

        if (actors.length === 0) return Response(null, "No Actors Found!");
        return Response(actors, "Success retrieving actors");

    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get actor by Id
exports.getActorById = async (actorId) => {
    try {
        const actor = await Actor.findOne({_id: actorId}).populate('movies');
        if (actor.length === 0) return Response(null, "No Actor Found!");
        return Response(actor, "Actor found!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// search for an actor
