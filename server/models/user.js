const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 1
    },
    name: {
        type: String,
        minlength: 1
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};