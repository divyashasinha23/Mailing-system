const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');

router.post('/Recurring_Schedule', (req,res) => {
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

    var {endSchedule} = req.body;
    const startTime = new Date(Date.now());
    const endTime = new Date(startTime.getTime() + endSchedule );
    const SecondSchedule = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/20 * * * * *' }, function(){
    transport.sendMail(mailDetails, function(err, info) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully'+ info.response);
        }
    }); 
});

});

module.exports = router;