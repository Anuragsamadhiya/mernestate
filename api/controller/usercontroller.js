import { errorHandler } from "../error/errorcontrol.js"
import bcrypt from "bcryptjs"
import user from "../models/usermodel.js"
import Listing from "../models/listingmodel.js"
export const test=(req,res)=>{
    res.send({
        message:"jay shree ram"
    })
}

export const updateduser=async(req,res,next)=>{
if(req.user.id!==req.params.id)return next(errorHandler(404,"Cant update others data"))
    try {
        if(req.body.password){
            req.body.password=await bcrypt.hash(req.body.password,10)
        }
        const userupdate=await user.findByIdAndUpdate(req.params.id,{
            username:req.body.username,
            email:req.body.email,
            password:req.body.password,
            avatar:req.body.avatar,
        },{new:true})
        const{password,...rest}=userupdate._doc //remove password from response which we get
        res.status(200).json(rest)
         } catch (error) {
        next(error)
    }
};
export const deleteuser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
      return next(errorHandler(401, 'You can only delete your own account!'));
    try {
      await user.findByIdAndDelete(req.params.id);
      res.clearCookie('access_token');
      res.status(200).json('User has been deleted!');
    } catch (error) {
      next(error);
    }
  };
export const getuserlistings=async(req,res,next)=>{
  if (req.user.id == req.params.id){
    try {
      const listing=await Listing.find({userRef:req.params.id})
      res.status(200).json(listing)
    } catch (error) {
      next(error)
    }
  }
  else{
    return next(errorHandler(402,'you can only view your listings'))
  }

}

export const getuser=async(req,res,next)=>{
  try {
    const getuser = await user.findById(req.params.id).select('-password')
    if(!getuser)return next(errorHandler(401,'user not found'))
res.status(201).json(getuser)
  } catch (error) {
    next(error)
  }

}