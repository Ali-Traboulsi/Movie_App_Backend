// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const GenreController = require('../controllers/genre.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /add-genre => POST ---- for creating a new genre
router.post('/add-genre', isAuthenticated, isAdmin, GenreController.createGenre);

// /update-genre => PUT ---- for updating a existing genre
router.put('/update-genre/:genreId', isAuthenticated, isAdmin, GenreController.updateGenre);

// /delete-genre => DELETE ---- for deleting a genre
router.delete('/delete-genre/:genreId', isAuthenticated, isAdmin, GenreController.deleteGenre);

// /get-genre => GET ---- for getting a single genre
router.get('/get-genre/:genreId', GenreController.getGenreById);

// /get-all-genres => GET ---- for getting all genres
router.get('/get-all-genres', GenreController.getAllGenres);

module.exports = router;
