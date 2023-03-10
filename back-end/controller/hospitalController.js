const Hospital = require("../models/hospital");
const Request = require("../models/request");
const Doctor = require("../models/doctor");
const Address = require("../models/address");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);
const EmployeeRequest = require("../models/employeeRequest");

const registerRequest = async (req, res) => {
  console.log(req.body, "from function");
  const { type, name, contact, address, specialities, walletAddress } =
    req.body;

  const encryptedWalletAddress = cryptr.encrypt(walletAddress);

  try {
    // console.log(encryptedWalletAddress,"address to approve after encrypt" );

    const request = await Request.create({
      type,
      name,
      contact,
      address: address,
      specialities,
      walletAddress: encryptedWalletAddress,
    });
    res.status(200).json({ request });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const allRequests = async (req, res) => {
  try {
    const requests = await Request.find();
    res.send(requests);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.send(hospitals);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const registerDoctor = async (req, res) => {
  const id = req.params.id;
  console.log(id, "id");
  // const  {firstName,lastName,yearOfExperience,qualification}=req.body;
  // console.log(firstName,lastName,yearOfExperience,qualification,walletAddress);
  // const hospitalId=req.params.id;
  let docId = "";
  try {
    const request = await EmployeeRequest.findById(id);
    const { empWalletAddress } = req.body;
    console.log(empWalletAddress, "hospital address");
    const {
      firstName,
      lastName,
      yearOfExperience,
      qualification,
      hospitalId,
      walletAddress,
    } = request;
    console.log(walletAddress, "address to approve after encrypt");
    const decryptedWalletAddress = cryptr.decrypt(walletAddress);
    console.log(decryptedWalletAddress, "address to approve after decrypt");
    const hospital = await Hospital.findById(hospitalId);
    console.log("hospital",hospital)

    const doctor = await Doctor.create({
      firstName,
      lastName,
      yearOfExperience,
      qualification,
      hospital: hospitalId,
    });

    docId = doctor._id;
    const empId = doctor._id.toString();
    console.log(empId, "empId");
    const instance = await require("../exports/instanceExport").getInstance();
    await instance.addEmplyoee(decryptedWalletAddress, empId, {
      from: empWalletAddress,
    });
    console.log("hii")
    hospital.doctors.push(doctor._id);
    hospital.save();
    res.status(200).json({ doctor });
  } catch (err) {
    if (docId !== "") {
      const doctor = await Doctor.findByIdAndDelete(docId);
    }

    res.status(400).json({ err: err.message });
  }
};
const deleteRequest = async (req, res) => {
  const id = req.params.id;
  try {
    const request = await EmployeeRequest.findByIdAndDelete(id);
    res.status(200).json({ request });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const removeDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doctor = await Doctor.findById(doctorId);
    const hospitalId = doctor.hospital;
    const hospital = await Hospital.findById(hospitalId);
    hospital.doctors.pull(doctorId);
    hospital.save();
    doctor.remove();
    res.status(200).json({ doctor });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const getAllDoctors = async (req, res) => {
  const hospitalId = req.params.id;
  try {
    const hospital = await Hospital.findById(hospitalId).populate("doctors");
    const doctors = hospital.doctors;
    res.status(200).json({ doctors });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
const getDoctorRequests = async (req, res) => {
  const hospitalId = req.params.id;
  try {
    const employeeRequest = await EmployeeRequest.find({
      hospitalId: hospitalId,
    });
    res.status(200).json({ employeeRequest });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  registerRequest,
  allRequests,
  getAllHospitals,
  registerDoctor,
  removeDoctor,
  getAllDoctors,
  getDoctorRequests,
  deleteRequest,
};
