const express=require("express");

const {registerInsuranceCompany,getAllInsuranceCompanies,getAllPatientsRequests} = require("../controller/insuranceCompanyController");
const router=express.Router();

router.post("/register",registerInsuranceCompany);
router.get("/getAll",getAllInsuranceCompanies);
router.get("/getAllPatients/:id",getAllPatientsRequests);


module.exports=router;