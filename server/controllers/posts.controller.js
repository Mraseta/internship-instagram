var {Post} = require('./../models/post');
var {User} = require('./../models/user');
const {ObjectID} = require('mongodb');
const fs = require('fs');
const path = require('path');

function fposts(req, res) {
    var id = req.user._id;
    console.log(id);

    User.findById(id).then((loggedUser) => {
        var following = loggedUser.following;

        var posts;

        Post.find({
            userId: {$in: following}
        }).then((userposts) => {
                userposts.sort(function(a, b) {
                return b.created-a.created;
            });
            posts = userposts;

            res.send({posts});
        });
    });
}

function newpost(req, res) {
    var id = req.user._id;

    var post = new Post({
        userId: id,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        created: new Date(),
        comments: []
    });

    post.save().then((doc) => {
        res.send({doc});
    }, (e) => {
        res.status(400).send(e);
    });
}

function uploadImage(req, res) {
    var loggedid = req.user._id;
    var base64image = req.body.base64image;
    var imageName = req.body.name;

    if (!ObjectID.isValid(loggedid)) {
        return res.status(404).send({text: 'Invalid user id'});
    }

    var savePath = path.join(__dirname, `../../front/dist/front/assets/images/${imageName}`);
    fs.writeFileSync(savePath, base64image, 'base64');

    savePath = path.join(__dirname, `../../front/src/assets/images/${imageName}`);
    fs.writeFileSync(savePath, base64image, 'base64');
    res.status(200).send({text: 'upload'});
}

function getPost(req, res) {
    var id = req.query.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Post.findById(id).then((post) => {
        if (!post) {
            return res.status(404).send();
        }

        res.send({post});
    }).catch((e) => {
        res.status(400).send();
    });
}

function comment(req, res) {
    var postid = req.body.post;
    var loggedid = req.user._id;

    User.findById(loggedid).then((loggedUser) => {
        if (!loggedUser) {
            return res.status(404).send();
        }

        var comment = {
            _id: new ObjectID(),
            authorId: loggedid,
            text: req.body.text,
            created: new Date()
        };

        Post.findByIdAndUpdate(postid, {
            $push: { comments: comment  }
        }, {
            returnOriginal: false
        }).then((result) => {
            return res.send(result);
        });
    });
}

function searchByDesc(req, res) {
    var input = req.query.input;

    Post.find().then((posts) => {
        if(!posts) {
            return res.status(404).send();
        }

        var ret = [];

        posts.forEach(element => {
            if(element.description.includes(input)){
                ret.push(element);
            }
        });

        ret.sort(function(a, b) {
            return b.created-a.created;
        });
        res.send({ret});
    }, (err) => {
        console.log('Error', err);
    });
}

module.exports = {
    fposts: fposts,
    newpost: newpost,
    getPost: getPost,
    comment: comment,
    uploadImage: uploadImage,
    searchByDesc: searchByDesc
}