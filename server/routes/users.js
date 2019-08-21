const express = require('express');
const router = express.Router();

var {authenticate} = require('./../middleware/authenticate');
var userCtrl = require('./../controllers/users.controller');

router.post('/login', userCtrl.login);
router.delete('/logout', authenticate, userCtrl.logout);
router.post('/register', userCtrl.register);
router.get('/profile', authenticate, userCtrl.profile);
router.get('', userCtrl.getAll);
router.get('/search', userCtrl.search);
router.get('/find', userCtrl.findUser);
router.patch('/change', authenticate, userCtrl.changeFollowing);

module.exports = router;