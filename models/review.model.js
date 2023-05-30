const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    __v: {type: Number, select: false},
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


module.exports = mongoose.model('Review', ReviewSchema);