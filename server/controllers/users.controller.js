var {User} = require('./../models/user');
const {ObjectID} = require('mongodb');

function login(req, res) {
    User.findOne({username: req.body.username}).then((user) => {
        if (user.password === req.body.password) {
            return res.status(200).send({user});
        }

        res.status(400).send('Incorrect password');
    }, (err) => {
        console.log('Unable to login', err);
    });
}

function register(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        following: []
    });

    user.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}

function getAll(req, res) {
    User.find().then((users) => {
        if (!users) {
            return res.status(404).send();
        }

        res.send({users});
    }, (err) => {
        console.log('Error', err);
    });
}

function search(req, res) {
    var input = req.params.input;

    User.find().then((users) => {
        if (!users) {
            return res.status(404).send();
        }

        var ret = [];

        users.forEach(element => {
            if(element.username.includes(input)){
                ret.push(element);
            }
        });

        res.send({ret});
    }, (err) => {
        console.log('Error', err);
    });
}

function follow(req, res) {
    var id = req.params.id;
    var loggedid = req.params.loggedid;
    console.log('usao');

    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        User.findByIdAndUpdate(loggedid, {
            $push: { following: new ObjectID(id)  }
        }, {
            returnOriginal: false
        }).then((result) => {
            return res.send(result);
        });
    }).catch((e) => {
        console.log('catch');
        res.status(400).send(e);
    });
}

function unfollow(req, res) {
    var id = req.params.id;
    var loggedid = req.params.loggedid;

    User.findById(id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        User.findByIdAndUpdate(loggedid, {
            $pullAll: { following: [new ObjectID(id)]  }
        }, {
            returnOriginal: false
        }).then((result) => {
            return res.send(result);
        });
    }).catch((e) => {
        res.status(400).send();
    });
}

function profile(req, res) {
    var username = req.params.username;

    User.findOne({username: username}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        Post.find({userId: user._id}).then((posts) => {
            posts.sort(function(a, b){
                return b.created - a.created;
            });
            res.send({
                username: user.username,
                image: user.imageUrl,
                posts: posts
            });

            // User.findById(loggedid).then((loggedUser) => {
            //     if (!loggedUser) {
            //         return res.status(404).send();
            //     }

            //     if (loggedUser.following.includes(id)) {
            //         res.send({
            //             username: user.username,
            //             image: user.imageUrl,
            //             posts: posts,
            //             followed: true
            //         });
            //     } else {
            //         res.send({
            //             username: user.username,
            //             image: user.imageUrl,
            //             posts: posts,
            //             followed: false
            //         });
            //     }
            // }).catch((e) => {
            //     res.status(400).send();
            // });
        }, (err) => {
            console.log('Error', err);
        });
    }).catch((e) => {
        res.status(400).send();
    });
}

module.exports = {
    login: login,
    register: register,
    profile: profile,
    getAll: getAll,
    search: search,
    follow: follow,
    unfollow: unfollow
}