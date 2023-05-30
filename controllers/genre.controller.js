const GenreServices = require('../services/genre.service');

exports.createGenre = async (req, res, next) => {
    try {
        const result = await GenreServices.createGenre(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateGenre = async (req, res, next) => {
    try {
        const genreId = req.params.genreId;
        const result = await GenreServices.updateGenre(genreId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteGenre = async (req, res, next) => {
    try {
        const genreId = req.params.genreId;
        const result = await GenreServices.deleteGenre(genreId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllGenres = async (req, res, next) => {
    try {
        const result = await GenreServices.getAllGenres(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getGenreById = async (req, res, next) => {
    try {
        const genreId = req.params.genreId;
        const result = await GenreServices.getGenreById(genreId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
