const User = require('../Models/SignupSchema');
const jwt = require('jsonwebtoken');

const maxAge = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({id}, process.env.USER, {
    expiresIn: maxAge,
    });
};

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
       res.json(err);
    }
 
}

module.exports.post_login = async(req, res) => {
  const {username} = req.body
  const {password} = req.body
  try{
    const user = await User.login(username,password);
    const token = createToken(user._id);
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
     res.status(201).json({
       _id : user._id,
       password: user.password,
       email: user.email,
       token:token
     });  
    }
      catch(err){
        console.log(err)
      }
}