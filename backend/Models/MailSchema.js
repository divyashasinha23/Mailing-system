const mongoose  = require('mongoose');

const mailSchema = new mongoose.Schema({

    hr:{
     type: String
    },
    sec:{
        type:String
    },
    min:{
        type:String
    },
    dow:{
        type:String
    },
    mon:{
        type:String
    },
    yr:{
        type:String
    },
    date:{
        type:String
    },
    startTime:{
        type: String
    },
    endTime:{
        type:String
    }
});

const Mail= mongoose.model('Mail', mailSchema);

module.exports = Mail;