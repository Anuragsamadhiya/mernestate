import express from 'express'
import mongoose from 'mongoose';
import env from 'dotenv'
import useRoute from "./route/useroute.js"
import signUp from "./route/signup.js"
import listingrouter from "./route/listingrouter.js"
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path'
env.config()
const mongouri=process.env.mongoURI

mongoose.connect(mongouri).then(()=>{
    console.log("connected to mongo");
})
const __dirname=path.resolve()
const app=express();
const port = 3000
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies to be sent
  origin: 'https://mern-estate-sj3a.onrender.com'
}));
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', useRoute);
app.use('/api/user', signUp);
app.use('/api/listing', listingrouter);

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.use((err,req,res,next)=>{ //middleware for herror measage
const statuscode=err.statuscode||500
const message=err.message||"Internal Server error"
return res.status(statuscode).json({
  succes:false,
  statuscode,
  message
})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})