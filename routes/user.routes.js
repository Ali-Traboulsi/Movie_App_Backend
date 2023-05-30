// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const UserController = require('../controllers/user.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /createUser => POST ---- for creating a new user
router.post('/add-user', isAuthenticated, isAdmin, UserController.createUser);

// /get-user => GET ---- for getting a user
router.get('/get-user/:userId', isAuthenticated, isAdmin, UserController.getUserById);

// /get-all-users => GET ---- for getting All users
router.get('/get-all-users', isAuthenticated, isAdmin, UserController.getAllUsers);

// /update => UPDATE ---- for getting a user
router.put('/update-user/:userId', isAuthenticated, UserController.updateUser);

// /delete => DELETE ---- for deleting a user
router.delete('/delete-user/:userId', isAuthenticated, UserController.deleteUser);

module.exports = router;
