// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const ActorController = require('../controllers/actor.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /add-actor => POST ---- for creating a new actor
router.post('/add-actor', isAuthenticated, isAdmin, ActorController.createActor);

// /update-actor => PUT ---- for updating a existing actor
router.put('/update-actor/:actorId', isAuthenticated, isAdmin, ActorController.updateActor);

// /delete-actor => DELETE ---- for deleting a actor
router.delete('/delete-actor/:actorId', isAuthenticated, isAdmin, ActorController.deleteActor);

// /get-actor => GET ---- for getting a single actor
router.get('/get-actor/:actorId', ActorController.getActorById);

// /get-all-actors => GET ---- for getting all actors
router.get('/get-all-actors', ActorController.getAllActors);

module.exports = router;

