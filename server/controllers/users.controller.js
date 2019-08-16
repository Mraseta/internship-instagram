var {User} = require('./../models/user');
var {Post} = require('./../models/post');
const {ObjectID} = require('mongodb');

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username}).then((user) => {
        if (user.password !== req.body.password) {
            res.status(403).send({text: 'Incorrect password'});
        } else {
            res.status(200).send({user});
        }
    }).catch((err) => {
        res.status(401).send({text: 'Invalid username'});
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

function findUser(req, res) {
    User.findById(req.query.id).then((user) => {
        if(!user) {
            return res.status(404).send();
        }

        res.send({user});
    }, (err) => {
        console.log('Error', err);
    });
}

function search(req, res) {
    var input = req.query.input;

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
    var username = req.query.username;
    var loggedid = req.query.loggedid;

    var founduser = null;

    User.findOne({username: username}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        founduser = user;
        // console.log(founduser._id);

        // res.send(founduser);

        Post.find({userId: new ObjectID(founduser._id)}).then((posts) => {
            var userposts = posts;
            // console.log('asdasdasdasdasdasdasdasd');

            userposts.sort(function(a, b){
                return b.created - a.created;
            });

            // console.log(userposts);
            // res.send({
            //     username: user.username,
            //     image: user.imageUrl,
            //     posts: posts
            // });

            User.findById(loggedid).then((loggedUser) => {
                if (!loggedUser) {
                    return res.status(404).send();
                }

                if (loggedUser.following.includes(founduser._id)) {
                    res.send({
                        user: founduser,
                        image: founduser.imageUrl,
                        followed: true,
                        posts: userposts
                    });
                } else {
                    res.send({
                        user: founduser,
                        image: founduser.imageUrl,
                        followed: false,
                        posts: userposts   
                    });
                }
            }).catch((e) => {
                res.status(400).send();
            });
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
    unfollow: unfollow,
    findUser: findUser
}