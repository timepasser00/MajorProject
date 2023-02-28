const express = require("express");
const {
  registrationRequest,
  getAllPatients,
  getDocDetails,
  uploadPrescription,
  setLabReport,
  getPrescriptionCnt,
  getLabTestInfo,
  getPrescription,
  
} = require("../controller/doctorController");

const router = express.Router();
router.post("/register", registrationRequest);
router.get("/getAllPatients/:walletAddress", getAllPatients);
router.get("/getDocDetails/:walletAddress", getDocDetails);
router.post("/uploadPrescription", uploadPrescription);
router.get("/getPrescriptionCnt/:patientId", getPrescriptionCnt);
router.get("/getLabTestInfo/:patientId/:perscriptionId/:labTechWalletAddress", getLabTestInfo);
router.post("/setLabReport", setLabReport);
router.get("/getPrescription/:patientId/:perscriptionId/:walletAddress", getPrescription);



module.exports = router;
