// import node packages
const { validate } = require('express-validation');
const express = require("express");

// import relative dependencies
const ReviewController = require('../controllers/review.controller');
const {isAuthenticated, isAdmin} = require("../middlewares/auth.middleware");

const router = express.Router();

// /add-review => POST ---- for creating a new review
router.post('/add-review/:movieId', isAuthenticated, ReviewController.createReview);

// /update-review => PUT ---- for updating a existing review
router.put('/update-review/:reviewId', isAuthenticated, ReviewController.updateReview);

// /delete-review => DELETE ---- for deleting a review
router.delete('/delete-review/:reviewId', isAuthenticated, ReviewController.deleteReview);

// /get-review => GET ---- for getting a single review
router.get('/get-review/:reviewId', ReviewController.getReviewById);

// /get-all-reviews => GET ---- for getting all reviews
router.get('/get-all-reviews', ReviewController.getAllReviews);

module.exports = router;
