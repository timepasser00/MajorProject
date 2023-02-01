const express=require("express");
const {registerRequest,allRequests,getAllHospitals, registerDoctor,removeDoctor,getAllDoctors}=require("../controller/hospitalController");

const router=express.Router();

router.post("/register",registerRequest)
router.get("/requests",allRequests)
router.get("/hospitals",getAllHospitals);
router.post("/registerDoctor/:id",registerDoctor);
router.get("/getAllDoctors/:id",getAllDoctors);
router.delete("/removeDoctor/:id",removeDoctor);
module.exports=router;