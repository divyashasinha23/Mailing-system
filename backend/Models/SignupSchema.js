const mongoose  = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema  = new mongoose.Schema({

    fullName:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


//static login
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if (user){
  const auth = await bcrypt.compare(password, user.password);
  if(auth){
      return user;
  }
  throw new Error('incorrect password');
    }
    throw new Error('invalid email');
}


const User= mongoose.model('User', userSchema);

module.exports = User;


