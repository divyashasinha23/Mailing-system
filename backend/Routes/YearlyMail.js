const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Auth = require('../Middleware/authMiddleware');

router.post('/Yearly_Schedule', Auth, (req,res) => {
    let {text} = req.body;
    var {from} = req.body;
    var {to} = req.body;
    var {subject} = req.body;
    var {cc} = req.body;

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.USER_EMAIL,
            pass: process.env.PASS
        }
    });

    var mailDetails = {
        from: from,
        to: to,
        subject: subject,
        cc: [cc],
        html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        line-height: 2;
        font-size: 20px; 
        ">
        <h2>did you like that</h2>
        <p>${text}</p>
    
        <p>This is Gunjana</p>
         </div>`

    };

         
    const {hr} = req.body;
    const {min} = req.body;
    const {dow} = req.body;
    const {mon} = req.body;
    const {yr} = req.body;
    const {date} = req.body;
    const {sec} = req.body;

    const YearSchedule = schedule.scheduleJob({date:date, hour: hr, minute:min}, () => {
        transport.sendMail(mailDetails, function(err, info) {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent successfully'+ info.response);
            }
        }); 
       });

});