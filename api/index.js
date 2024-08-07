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
// const port = process.env.PORT || 3000;
const allowedOrigins = [
  'http://localhost:5173',
  'https://mern-estate-sj3a.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow requests with no origin (like mobile apps)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow cookies to be sent
};


app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
app.use('/api/auth', useRoute);
app.use('/api/user', signUp);
app.use('/api/listing', listingrouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
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
