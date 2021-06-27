const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

router.post('/send_mail', (req,res) => {
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

    transport.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
        } else {
            console.log('Email sent successfully');
        }
    });


});

module.exports = router;