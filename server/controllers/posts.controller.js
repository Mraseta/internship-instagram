var {Post} = require('./../models/post');
var {User} = require('./../models/user');
const {ObjectID} = require('mongodb');

function fposts(req, res) {
    var id = req.query.loggedid;

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
    var id = req.params.id;

    var post = new Post({
        userId: id,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        comments: []
    });

    post.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
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
    var loggedid = req.body.loggedid;

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

module.exports = {
    fposts: fposts,
    newpost: newpost,
    getPost: getPost,
    comment: comment
}