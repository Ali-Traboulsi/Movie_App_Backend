const MovieServices = require('../services/movie.service');

exports.createMovie = async (req, res, next) => {
    try {
        const result = await MovieServices.createMovie(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateMovie = async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const result = await MovieServices.updateMovie(movieId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteMovie = async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const result = await MovieServices.deleteMovie(movieId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllMovies = async (req, res, next) => {
    try {
        const result = await MovieServices.getAllMovies(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getMovieById = async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const result = await MovieServices.getMovieById(movieId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
