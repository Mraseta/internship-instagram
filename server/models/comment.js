var mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

var Comment = mongoose.model('Comment', {
    authorId: {
        type: ObjectID,
        required: true,
        trim: true,
        minlength: 1
    },
    text: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    created: {
        type: Date,
        default: new Date()
    }
});

module.exports = {Comment};