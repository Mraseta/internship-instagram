const express = require('express');
const router = express.Router();

var postCtrl = require('./../controllers/posts.controller');
var {authenticate} = require('./../middleware/authenticate');

router.get('/fposts', authenticate, postCtrl.fposts);
router.post('/newpost', authenticate, postCtrl.newpost);
router.get('/post', postCtrl.getPost);
router.post('/comment', authenticate, postCtrl.comment);
router.post('/upload', authenticate, postCtrl.uploadImage);
router.get('/search', postCtrl.searchByDesc);

module.exports = router;