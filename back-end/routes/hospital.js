const express=require("express");
const {registerRequest,allRequests,getAllHospitals, registerDoctor}=require("../controller/hospitalController");

const router=express.Router();

router.post("/register",registerRequest)
router.get("/requests",allRequests)
router.get("/hospitals",getAllHospitals);
router.post("/registerDoctor",registerDoctor);
module.exports=router;