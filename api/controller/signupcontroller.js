import { errorHandler } from "../error/errorcontrol.js";
import User from "../models/usermodel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import env from "dotenv"

export const signup=async(req,res,next)=>{
    env.config()

const{username,email,password}=req.body;
   //hash the pasword which is string thats why use hashSync otherwise only hash used
try {
    if (!email || !password) {
        return next(errorHandler(400, "Please fill Credentials"));
    }
    const find=await User.findOne({email})
    if(find){
        return next(errorHandler(400, "Email already exist"));

    }
    const hashpassword=await bcrypt.hash(password,10)
    const newuser= new User({ username,email,password:hashpassword})

    await newuser.save()
res.status(201).json("user created succefully")
} catch (error) {
   next(error)
}

}
export const signin=async(req,res,next)=>{
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword =await bcrypt.compare(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWTsecretKEY);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true},{maxAge: 31536000})
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
export const google=async(req,res,next)=>{
try {
    const user=await User.findOne({email:req.body.email}).select('-password');
    if(user){
        const token=jwt.sign({id:user._id},process.env.JWTsecretKEY)
        res.cookie('access_token',token,{maxAge: 31536000}, {httpOnly:true}).status(200).json(user);
    }else{
        console.log('Received photo URL:', req.body.photo);

        const generatepassword=Math.random().toString(36).slice(-8)
        const hashpassword=await bcrypt.hash(generatepassword,10)
        const newuser= new User({ username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-8),email:req.body.email,password:hashpassword,avatar:req.body.photo})
await newuser.save();
const token=jwt.sign({id:newuser._id},process.env.JWTsecretKEY)
// const user=await User.findOne({email:req.body.email}).select('-password');
// localStorage.setItem('auth-token',token);

res.cookie('access_token',token,{httpOnly:true}).status(200).json(newuser);

    }
} catch (error) {
    next(error)
}
}

export const signout=async(req,res,next)=>{
try {
    res.clearCookie('access_token');
    res.status(200).json('Signing Out!');
} catch (error) {
    next(error)
}
}