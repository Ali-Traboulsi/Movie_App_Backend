const mongoose = require("mongoose");

const Error = require('../utils/error')
const { verifyActorId, verifyUniqueActors } = require('../validations/actor.validation');
const { verifyUniqueDirectors, verifyDirectorId} = require('../validations/director.validation');

const MovieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    }],
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Actor",
        required: true,
        validate: [
            {
                validator: verifyActorId, // verify if actor is already in the database
                message: 'Invalid Actor Id'
            },
            {
                validator: verifyUniqueActors, // validate for unique actors
                message: "Movie cannot have duplicate Actors",
            },
        ],
    }],
    release_date: {
        type: Date,
        required: true,
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Director',
        required: true,
        validate: {
            validator: verifyDirectorId,
            message: 'Invalid Director Id'
        },
    },
    duration: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true
    },
    country: {
        type: String,
    },
    poster: {
        type: String,
    },
    trailer: {
        type: String,
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
    }],
    __v: {type: Number, select: false},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Movie', MovieSchema);
