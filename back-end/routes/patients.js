const express = require("express");
const { registerDetails,getDetails } = require("../controller/patientController");
const router = express.Router();


router.post("/patientDetails", registerDetails);
router.post("/patientPersonalDetails", getDetails);
module.exports = router;
