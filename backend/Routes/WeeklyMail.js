const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Auth = require('../Middleware/authMiddleware');
const WeeklyMailController = require('../Controller/WeeklyMailController');

router.post('/Weekly_Schedule',Auth, WeeklyMailController.weeklyMail);
    

module.exports = router;