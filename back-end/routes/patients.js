const express = require("express");
const { registerDetails,getDetails ,searchHospital} = require("../controller/patientController");
const { checkSignUp } = require("../middleware/signUp");
const router = express.Router();


router.post("/patientDetails",checkSignUp, registerDetails);
router.post("/patientPersonalDetails", getDetails);

router.get('/searchHospital/:query', searchHospital);
module.exports = router;
