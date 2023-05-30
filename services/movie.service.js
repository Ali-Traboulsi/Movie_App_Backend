const mongoose = require('mongoose');

// import models
const Genre = require('../models/genre.model');
const Actor = require('../models/actor.model');
const Movie = require('../models/movie.model');
const Director = require('../models/director.model');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// create a movie
exports.createMovie = async (body) => {
    const movie = new Movie({
        title: body.title,
        description: body.description,
        genres: body.genres,
        actors: body.actors,
        release_date: body.release_date,
        director: body.director,
        duration: body.duration,
        rating: body.rating,
        language: body.language,
        country: body.country,
        poster: body.poster,
        trailer: body.trailer,
    });

    const actorIds = movie.actors

    console.log(actorIds);

    const result = await movie.save();
    console.log(movie._id);

    await Actor.updateMany({_id: {$in: actorIds}}, {
        $push: { movies: movie._id}
    })

    await Director.updateOne({_id: movie.director}, {
        $push: {movies: movie._id}
    });


    if (!result) {
        throw Error(500, "Error Creating movie. Server Error Occured.");
    }

    return Response(result, "Success creating movie.");
}


// update a movie
exports.updateMovie = async (movieId, body) => {
    try {
        const updatedMovie = await Movie.updateOne(
            {_id: movieId},
            {
                $set: {
                    title: body.title,
                    description: body.description,
                    genres: body.genres,
                    actors: body.actors,
                    release_date: body.release_date,
                    director: body.director,
                    duration: body.duration,
                    rating: body.rating,
                    language: body.language,
                    country: body.country,
                    poster: body.poster,
                    trailer: body.trailer,
                },
            },
            { omitUndefined: true }
        );

        return Response(updatedMovie, "Movie has been updated")

    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
    };

// get a movie by Id
exports.getMovieById = async (movieId) => {
    try {
        const result = await Movie
            .findOne({_id: movieId})
            .populate('genres')
            .populate('actors')
            .populate('director')
        ;
        return Response(result, "Movie Found!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// get all movies
exports.getAllMovies = async () => {
    try {
        const result = await Movie
            .find()
            .sort('created_at')
            .populate('genres')
            .populate('actors')
            .populate('director')
        ;
        if (result.length === 0) {
            return Response(null, "No Users Found")
        }
        return Response(result, "Movies Found!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// delete a movie
exports.deleteMovie = async (movieId) => {
    try {
        const result = await Movie.deleteOne({_id: movieId});
        if (result.deleteCount == 0) return  Response(null, "No Counts Found!")
        return Response(null, "Movie Deleted!");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
}

// search for movie
