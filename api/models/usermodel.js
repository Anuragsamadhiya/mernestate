import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    avatar:{ // If the avatar field is not provided in the request body, the database will automatically use the specified default URL for the avatar field.
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },

},{timestamps:true})

const user=mongoose.model("User",userschema);
export default user;