const express = require('express');
const router = express.Router();

var postCtrl = require('./../controllers/posts.controller');

router.get('/fposts/:id', postCtrl.fposts);
router.post('/newpost/:id', postCtrl.newpost);
router.get('/:id', postCtrl.getPost);
router.post('/comment/:post&:loggedid', postCtrl.comment);

module.exports = router;