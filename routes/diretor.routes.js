// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const DirectorController = require('../controllers/director.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /add-director => POST ---- for creating a new director
router.post('/add-director', isAuthenticated, isAdmin, DirectorController.createDirector);

// /update-director => PUT ---- for updating a existing director
router.put('/update-director/:directorId', isAuthenticated, isAdmin, DirectorController.updateDirector);

// /delete-director => DELETE ---- for deleting a director
router.delete('/delete-director/:directorId', isAuthenticated, isAdmin, DirectorController.deleteDirector);

// /get-director => GET ---- for getting a single director
router.get('/get-director/:directorId', DirectorController.getDirectorById);

// /get-all-directors => GET ---- for getting all directors
    router.get('/get-all-directors', DirectorController.getAllDirectors);

module.exports = router;
