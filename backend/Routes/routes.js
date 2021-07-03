const express = require('express');
const UserController = require('../Controller/UserController');
const Auth = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/signup',UserController.post_signup);
router.post('/login', UserController.post_login);
router.route('/profile').get(Auth, UserController.get_profile);

module.exports = router;
