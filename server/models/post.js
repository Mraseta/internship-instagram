var mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const {Comment} = require('./comment');

var PostSchema = new mongoose.Schema({
    userId: {
        type: ObjectID,
        required: true,
        trim: true,
        minlength: 1
    },
    imageUrl: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    description: {
        type: String,
        trim: true,
        minlength: 1
    },
    created: {
        type: Date,
        default: new Date()
    },
    comments: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            default: new ObjectID()
        },
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
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
    }]
});

var Post = mongoose.model('Post', PostSchema);

module.exports = {Post};