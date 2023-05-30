// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const MovieController = require('../controllers/movie.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /add-movie => POST ---- for creating a new movie
router.post('/add-movie', isAuthenticated, isAdmin, MovieController.createMovie);

// /update-movie => PUT ---- for updating a existing movie
router.put('/update-movie/:movieId', isAuthenticated, isAdmin, MovieController.updateMovie);

// /delete-movie => DELETE ---- for deleting a movie
router.delete('/delete-movie/:movieId', isAuthenticated, isAdmin, MovieController.deleteMovie);

// /get-movie => GET ---- for getting a single movie
router.get('/get-movie/:movieId', MovieController.getMovieById);

// /get-all-movies => GET ---- for getting all movies
router.get('/get-all-movies', MovieController.getAllMovies);

module.exports = router;
