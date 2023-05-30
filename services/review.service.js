const mongoose = require('mongoose');

// import models
const Review = require('../models/review.model');
const Movie = require('../models/movie.model');

// import utilities
const Error = require('../utils/error');
const Response = require('../utils/response');

// create review
exports.createReview = async (movieId, body, userId) => {
    try {
        const movie = await Movie.findOne({_id: movieId});
        if (!movie) throw Error(404, "Movie Does Not Exist!");

        const review = new Review({
            title: body.title,
            rating: body.rating,
            comment: body.comment,
            movie: movieId,
            user: userId
        });

        const result = await review.save();

        if(!result) throw Error(500, "Error Creating Review. Server Error Occurred!");

        // add the review id to the associated movie doc
        const updatedMovie = await Movie.updateOne(
            { _id: movieId },
            { $push: {reviews: review._id} },
            {new: true},
        );

        if(!updatedMovie) throw Error(500, "Error updating Movie. Server Error Occurred!");

        return Response(result, "Success Creating Review");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// update review
exports.updateReview = async (reviewId, body) => {
    try {
        await Review.updateOne(
            {_id: reviewId},
            {
                $set: {
                    rating: body.rating,
                    comment: body.comment,
                }
            },
            {omitUndefined: true},
        );

        return Response(null, "Successfully Updated Review");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// delete review
exports.deleteReview = async (reviewId) => {
    try {
        const result = await Review.deleteOne({_id: reviewId});
        await Movie.updateMany(
            {reviews: reviewId},
            {$pull: {reviews: reviewId}}
        );
        if (result.deleteCount === 0) return  Response(null, "No Review Found!")
        return Response(null, "Successfully Deleted Review");
    } catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
    };

// get all reviews
exports.getAllReviews = async () => {
    try {
        const result = await Review.find().sort('created_at').populate('movie');
        if (result.length === 0) return Response(null, "No Reviews Found!");
        return Response(result, "Successfully Fetched Reviews");
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// get review by Id
exports.getReviewById = async (reviewId) => {
    try {
        const result = await Review.findOne({_id: reviewId}).populate('movie');
        if (result.length === 0) return Response(null, "No Reviews Found!");
        return Response(result, "Review Found!")
    }  catch (err) {
        console.error(err);
        return Error(err.status, err.message);
    }
};

// search for reviews
exports.SearchReview = async () => {

};
