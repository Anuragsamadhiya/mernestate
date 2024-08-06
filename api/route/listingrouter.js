import express from "express"
import { createlistings,deletelistings ,getlisting,updatelisting,getlistings} from "../controller/listingcontroller.js";
import { verifytoken } from "../error/verifyuser.js";
const router=express.Router();
router.post('/addlisting',verifytoken,createlistings)
router.delete('/deletelisting/:id',verifytoken,deletelistings)
router.post('/updatelisting/:id',verifytoken,updatelisting)
router.get('/getlisting/:id',getlisting)
router.get('/getall',getlistings)  //for search functionality
export default router;