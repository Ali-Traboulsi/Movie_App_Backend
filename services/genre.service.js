const mongoose = require('mongoose');

// import models
const Genre = require('../models/genre.model');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// create genre
exports.createGenre = async (body) => {
    try {
        const genre = new Genre({
            name: body.name,
        });
        const result = await genre.save();
        if(!result) throw Error(500, "Error Creating Genre. Server Error Occured!");
        return Response(result, "Success Creating Genre");
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
    };

// update genre
exports.updateGenre = async (genreId, body) => {
    try {
        await Genre.updateOne(
            {_id: genreId},
            {
                $set: {name: body.name}
            },
            {omitUndefined: true},
        );
        return Response(null, "Successfully Updated Genre");
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// delete genre
exports.deleteGenre = async (genreId) => {
    try {
        await Genre.deleteOne({_id: genreId});
        return Response(null, "Successfully Deleted Genre");
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get all genres
exports.getAllGenres = async () => {
    try {
        const result = await Genre.find().sort('created_at');
        if (result.length === 0) return Response(null, "No Genres Found!");
        return Response(result, "Successfully Fetched Genres");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
    };

// get genre by Id
exports.getGenreById = async (genreId) => {
    try {
        const result = await Genre.findOne({_id: genreId});
        if (result.length === 0) return Response(null, "No Genres Found!");
        return Response(result, "Genre Found!")
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
 };

// search for genres
exports.SearchGenre = async () => {

};
