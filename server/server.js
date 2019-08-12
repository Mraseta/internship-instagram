const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Post} = require('./models/post');
var {Comment} = require('./models/comment');

const userroute = require('./routes/users');
const postroute = require('./routes/posts');

var app = express();

app.use(bodyParser.json());

app.use('/users', userroute);
app.use('/posts', postroute);

app.listen(3000, () => {
    console.log('Started on port 3000');
});