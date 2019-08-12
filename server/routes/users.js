const express = require('express');
const router = express.Router();

var userCtrl = require('./../controllers/users.controller');

router.get('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.get('/profile/:username', userCtrl.profile);
router.get('', userCtrl.getAll);
router.get('/search/:input', userCtrl.search);
router.patch('/follow/:id&:loggedid', userCtrl.follow);
router.patch('/unfollow/:id&:loggedid', userCtrl.unfollow);

module.exports = router;