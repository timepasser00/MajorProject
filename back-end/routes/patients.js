const express = require("express");
const {
  registerDetails,
  getDetails,
  searchHospital,
  searchLab,
  searchHospitalForAppointment,
  getAvailableSlots,
  bookAppointment,
  getApprovedDoctors,
  approveDoctor,
  approveLabs,
  getApprovedLabs,
  approveLabTech,
  approveInsuranceCompany,
  getDoctorRatings,
  doctorRatings,
  isDoctorApproved,
  removeDoctor
} = require("../controller/patientController");
const { checkSignUp } = require("../middleware/signUp");
const router = express.Router();

// router.post("/patientDetails",checkSignUp, registerDetails);
router.post("/patientDetails", registerDetails);
// router.post("/patientPersonalDetails", getDetails);

router.get("/searchHospital/:query", searchHospital);
router.get("/searchLab/:query", searchLab);
router.post("/searchHospital", searchHospitalForAppointment);
router.post("/availableSlots/:doctorId", getAvailableSlots);
router.post("/bookAppointment/:doctorId", bookAppointment);
router.get("/getApprovedDoctors/:patientId", getApprovedDoctors);
router.post("/approveDoctor", approveDoctor);
router.post("/approveLabs", approveLabs);
router.get("/getApprovedLabs/:patientId", getApprovedLabs);
router.post("/approveLabTech", approveLabTech);
router.post("/approveInsuranceCompany", approveInsuranceCompany);
router.get("/getDetails/:id", getDetails);
router.post("/doctorRatings", doctorRatings);
router.get("/getDoctorRatings/:doctorId", getDoctorRatings);
router.get("/isDoctorApproved/:doctorId/:patientWalletAddress", isDoctorApproved);
router.post("/removeDoctor",removeDoctor);
module.exports = router;
