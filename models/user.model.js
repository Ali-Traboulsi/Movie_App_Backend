const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    nbOfAttempts: {
        type: Number,
        default: 0,
    },
    blocked: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "guest",
        enum: ['admin', 'guest']
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie'
    }],
    reviews: [{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Review'
    }],
    profileImage: {
        type: String,
        default: 'https://i.imgur.com/w35h86x.png'
    },
    resetToken: {
      type: String
    },
    resetTokenExpiry: {
      type: Date,
    },
    __v: {type: Number, select: false},
},  {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

module.exports = mongoose.model('User', UserSchema);
