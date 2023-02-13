const express=require("express");
const {registerRequest,allRequests,getAllHospitals, registerDoctor,removeDoctor,getAllDoctors,getDoctorRequests,deleteRequest}=require("../controller/hospitalController");

const router=express.Router();

router.post("/register",registerRequest)
router.get("/requests",allRequests)
router.get("/hospitals",getAllHospitals);
router.post("/registerdoctor/:id",registerDoctor);
router.get("/getAllDoctors/:id",getAllDoctors);
router.delete("/removeDoctor/:id",removeDoctor);
router.get('/getRequests/:id',getDoctorRequests)
router.delete('/deleteRequest/:id',deleteRequest)
module.exports=router;