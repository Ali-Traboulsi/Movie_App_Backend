const mongoose = require("mongoose");

const ActorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    biography: {
        type: String,
        required: true,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    __v: {type: Number, select: false},
},  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});


module.exports = mongoose.model('Actor', ActorSchema);