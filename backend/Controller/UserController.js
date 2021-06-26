const User = require('../Models/SignupSchema');

module.exports.post_signup = async(req,res)=>
{
  const {fullName,email,password,username}=req.body;
 
  try{
       const user=await User.create({fullName,email,password,username});
    //    const token =createToken(user._id);
      //  res.cookie('jwt',token,{ httpOnly: true, maxAge: maxAge * 1000 })
       if(user){
         res.status(201);
         res.json({
           _id:user._id,
           fullName:user.fullName,
           password:user.password,
           email:user.email,   
           username:user.username,
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