const Mail = require('../Models/MailSchema');
const nodemailer = require('nodemailer');
const schedule = require('node-schedule');

module.exports.secondMail = async(req,res) => {

    const {text} = req.body;
    const {from} = req.body;
    const {to} = req.body;
    const {subject} = req.body;
    const {cc} = req.body;

    const {endSchedule} = req.body;

    const startTime = new Date(Date.now());
    const endTime = new Date(startTime.getTime() + endSchedule );

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
    
        

  
        const secondmail = await Mail.create({startTime, endTime});
        
        const SecondSchedule = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/20 * * * * *' }, function(){
        transport.sendMail(mailDetails, function(err, info) {
            if(err) {
                console.log(err);
            } else {
                console.log('Email sent successfully'+ info.response);
            }
        }); 
    });

    }

    catch(err){
        console.log(err);
    }

 
}