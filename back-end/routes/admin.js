const express=require("express");
const {approveRequest,deleteRequest}=require("../controller/adminController");

const router=express.Router();

router.post("/approve/:id",approveRequest)
router.delete("/approve/:id",deleteRequest)
module.exports=router;