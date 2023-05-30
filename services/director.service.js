const mongoose = require('mongoose');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// import models
const Director = require('../models/director.model');
const Movie = require('../models/movie.model');

// create director
exports.createDirector = async (body) => {
    try {
        const director = new Director({
            name: body.name,
            age: body.age,
            gender: body.gender,
            biography: body.biography,
            movies: body.movies,
        })

        const result = await director.save();
        if (!result) {
            throw Error(500, "Error Creating Director. Server Error!")
        }
        return Response(result, "Success Creating Director!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// update director
exports.updateDirector = async (directorId, body) => {
    try {
        await Director.updateOne(
            {_id: directorId},
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
        return Response(null, "Success updating Director!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// delete director
exports.deleteDirector = async (directorId) => {
    try {
        await Movie.updateMany(
            {director: directorId},
            {$pull: {director: directorId}}
        );
        const result = await Director.deleteOne({_id: directorId});
        if (!result) throw Error(404, "Director not found!");
        return Response(null, "Success Deleting Director")
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get all directors
exports.getAllDirectors = async () => {
    try {
        const directors = await Director
            .find()
            .populate('movies')
            .sort('created_at');

        if (directors.length === 0) return Response(null, "No Directors Found!");
        return Response(directors, "Success retrieving directors");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get director by Id
exports.getDirectorById = async (directorId) => {
    try {
        const director = await Director.findOne({_id: directorId}).populate('movies');
        if (director.length === 0) return Response(null, "No Director Found!");
        return Response(director, "Director found!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// search for an director