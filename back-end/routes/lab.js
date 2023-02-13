const express=require("express");
const {allRequests,getAllLabs,registerLabTech,getAllLabTechs}=require("../controller/labController");
const router=express.Router();



// router.post("/register",registrationRequest)
router.get('/getRequests/:id',allRequests)
router.get('/getAllLabs',getAllLabs)
router.post("/registerlabTech/:id",registerLabTech);
router.get("/getAllLabTechs/:id",getAllLabTechs);


module.exports=router;