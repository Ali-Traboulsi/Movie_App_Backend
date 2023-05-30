const ReviewServices = require('../services/review.service');

exports.createReview = async (req, res, next) => {
    try {
        const movieId = req.params.movieId;
        const userId = req.userId;
        const result = await ReviewServices.createReview(movieId, req.body, userId);
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.updateReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const result = await ReviewServices.updateReview(reviewId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const result = await ReviewServices.deleteReview(reviewId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getAllReviews = async (req, res, next) => {
    try {
        const result = await ReviewServices.getAllReviews(req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};

exports.getReviewById = async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const result = await ReviewServices.getReviewById(reviewId, req.body)
        return res.status(200).send(result);
    } catch (err) {
        next(err);
    }
};
