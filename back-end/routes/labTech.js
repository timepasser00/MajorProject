const express = require("express");
const {registrationRequest,getAllPatients}=require("../controller/labTechController");
const router=express.Router();
router.post("/register",registrationRequest)
router.get("/getAllPatients/:walletAddress",getAllPatients)

module.exports=router;