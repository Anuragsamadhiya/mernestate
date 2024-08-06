import express from "express"
import {signup,signin, google, signout} from '../controller/signupcontroller.js'
const route=express.Router();
route.post('/signup',signup)
route.post('/signin',signin)
route.post('/Google',google)
route.get('/signout',signout)

export default route;