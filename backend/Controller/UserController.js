const User = require('../Models/SignupSchema');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
  return jwt.sign({id}, process.env.USER ,{
  expiresIn: '30d'
});
}


//error handling
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: ''};

  if (err.code === 11000) {
     errors.email = 'That Email is Already Registered';
    }
    
  if(err.message === "invalid email") {
    errors.email = "Invalid Email";
  } 

  if(err.message === "incorrect password"){
    errors.password = "Password is incorrect";
    
  }


  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
return errors;
}


module.exports.post_signup = async(req,res)=>
{
  const {fullName,email,password,username}=req.body;
 
  try{
       const user= await User.create({fullName,email,password,username});
       const token = createToken(user._id);
       if(user){
         res.status(201);
         res.json({
           _id:user._id,
           fullName:user.fullName,
           password:user.password,
           email:user.email,   
           username:user.username,
           token:token
          
         });
       }
       else{
        res.status(400);
        throw new Error ('Invalid details');   
       }

    }
    catch(err)
    {
      const errors = handleErrors(err);
      res.status(400).json({errors});
    }
 
}

module.exports.post_login = async(req, res) => {
  const {email} = req.body
  const {password} = req.body
  try{
    const user = await User.login(email,password);
    const token = createToken(user._id);
     res.status(201).json({
       _id : user._id,
       password: user.password,
       email: user.email,
       token:token
     });  
    }
      catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
      }
}

//profile section
module.exports.get_profile = async (req,res) => {
  try{
  const user = await User.findById(req.user._id);
  if(user) {
      res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
      });
  }
  else{
      res.status(404);
      throw new Error('user not found');
  }
  }
  catch(err){
      console.log(err);
  }
}