const express = require('express');
const router = express.Router();

var postCtrl = require('./../controllers/posts.controller');

router.get('/fposts', postCtrl.fposts);
router.post('/newpost/:id', postCtrl.newpost);
router.get('/post', postCtrl.getPost);
router.post('/comment', postCtrl.comment);

module.exports = router;