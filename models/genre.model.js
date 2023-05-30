const mongoose = require("mongoose");

const GenreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    __v: {type: Number, select: false},
},  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('Genre', GenreSchema);