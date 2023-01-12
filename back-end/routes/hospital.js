const express=require("express");
const {registerRequest,allRequests}=require("../controller/hospitalController");

const router=express.Router();

router.post("/register",registerRequest)
router.get("/requests",allRequests)
module.exports=router;