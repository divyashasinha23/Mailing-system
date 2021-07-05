const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Auth = require('../Middleware/authMiddleware');
const SecondMailController = require('../Controller/SecondMailController');

router.post('/Recurring_Schedule',Auth, SecondMailController.secondMail);

module.exports = router;