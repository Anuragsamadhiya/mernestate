import  jwt from "jsonwebtoken";
import { errorHandler } from "./errorcontrol.js";

//extracting auth-token from cookies where we store when signin,login  importing npm i cookie-parser and adding app.use(cookies()) in index.js
export const verifytoken=(req,res,next)=>{
  //   console.log('Request Headers:', req.headers);
  // console.log('Cookies:', req.cookies);
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'Unauthorized'));
  
    jwt.verify(token, process.env.JWTsecretKEY, (err, user) => {
      if (err) return next(errorHandler(403, 'Forbidden'));
      req.user = user;
      next();
    });
  };