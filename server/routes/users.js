const express = require('express');
const router = express.Router();

var userCtrl = require('./../controllers/users.controller');

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.get('/profile', userCtrl.profile);
router.get('', userCtrl.getAll);
router.get('/search', userCtrl.search);
router.get('/find', userCtrl.findUser);
router.patch('/follow/:id&:loggedid', userCtrl.follow);
router.patch('/unfollow/:id&:loggedid', userCtrl.unfollow);

module.exports = router;