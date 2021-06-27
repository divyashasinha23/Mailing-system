const express = require('express');
const UserController = require('../Controller/UserController');
const router = express.Router();

router.post('/signup',UserController.post_signup);
router.post('/login', UserController.post_login);

module.exports = router;
