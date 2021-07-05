const Mail = require('../Models/MailSchema');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');



module.exports.weeklyMail = async(req,res) => {

    
    let {text} = req.body;
    var {from} = req.body;
    var {to} = req.body;
    var {subject} = req.body;
    var {cc} = req.body;


    const {hr} = req.body;
    const {min} = req.body;
    const {dow} = req.body;
    const {sec} = req.body;
    const {yr} = req.body;

    try{
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

         

    
    const weeklymail =  await Mail.create({});
    
    if(weeklymail){
    const rule = new schedule.RecurrenceRule();
    rule.hour = hr;
    rule.minute = min;
    rule.dayOfWeek = dow;

     
    const WeekSchedule = schedule.scheduleJob(rule, () => {
        transport.sendMail(mailDetails, function(err, info) {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent successfully'+ info.response);
            }
        }); 
    });

    }

  else{
    res.status(400);
    throw new Error ('Invalid details'); 
  }
}
catch(err)
{
  console.log(err);
}
}

