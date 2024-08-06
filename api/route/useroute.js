import express from "express"
import {test,updateduser,deleteuser,getuserlistings,getuser} from '../controller/usercontroller.js'
import { verifytoken } from "../error/verifyuser.js";
const route=express.Router();
route.get('/test',test)
route.post('/updateuser/:id',verifytoken,updateduser);   //phle verifyuser run hoga then updateuser
route.delete('/deleteuser/:id',verifytoken,deleteuser);   //phle verifyuser run hoga then updateuser
route.get('/listing/:id',verifytoken,getuserlistings); 
route.get('/:id',verifytoken,getuser); 
export default route;