const express = require('express');
const router = express.Router();

var postCtrl = require('./../controllers/posts.controller');

router.get('/fposts', postCtrl.fposts);
router.post('/newpost', postCtrl.newpost);
router.get('/post', postCtrl.getPost);
router.post('/comment', postCtrl.comment);
router.post('/upload', postCtrl.uploadImage);
router.get('/search', postCtrl.searchByDesc);

module.exports = router;