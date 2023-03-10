const Patient = require("../models/patient");
const mongoose = require("mongoose");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");
const EmployeeRequest = require("../models/employeeRequest");
const Cryptr = require("cryptr");
// const { getFile } = require("../exports/ipfsHandler.mjs");
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

// const searchPatient =async (req, res) => {
//     const {firstName,lastName} = req.body;
//     console.log(firstName,lastName);
//     try {
//         const patient = await Patient
//         .find
//         (
//             {
//                 $and:
//                 [
//                     {firstName:firstName},
//                     {lastName:lastName}
//                 ]
//             }
//         );
//         console.log(patient)
//         res.status(200).json( patient );
//         } catch (err) {

//         res.status(400).json({ err: err.message });
//         }
// };

// const registerWithHospital = async (req, res) => {
//    const  {firstName,lastName,yearOfExperience,qualification,hospitalId}=req.body;
//     console.log(firstName,lastName,yearOfExperience,qualification,hospitalId);

//     try{
//         const hospital=await Hospital.findById(hospitalId);

//         const doctor=await Doctor.create({firstName,lastName,yearOfExperience,qualification,hospital});
//         hospital.doctors.push(doctor);
//         res.status(200).json({doctor});
//     }catch(err){
//         res.status(400).json({err:err.message});
//     }
// }

const registrationRequest = async (req, res) => {
  const {
    firstName,
    lastName,
    yearOfExperience,
    qualification,
    hospitalId,
    walletAddress,
  } = req.body;
  console.log("docWalledAddress",walletAddress);
  
  const encryptedWalletAddress = cryptr.encrypt(walletAddress);
  console.log(
    firstName,
    lastName,
    yearOfExperience,
    qualification,
    hospitalId,
    walletAddress
  );
  try {
    const employeeRequest = await EmployeeRequest.create({
      firstName,
      lastName,
      yearOfExperience,
      qualification,
      hospitalId,
      walletAddress: encryptedWalletAddress,
      employeeType:"doctor",
    });
    res.status(200).json({ employeeRequest });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};
const getAllPatients = async (req, res) => {
  const {walletAddress} = req.params;
  try{
    const instance = await require("../exports/instanceExport").getInstance();
    const docId=await instance.getId(walletAddress);
    console.log(docId,"docId from doctorController");
    const doctor=await Doctor.findById(docId).populate("approvedBy");
    const patient=doctor.approvedBy;
    res.status(200).json({patient});
    console.log(walletAddress,"walletAddress from doctorController");
  }catch(err){
    res.status(400).json({err:err.message});
  }
}
const getDocDetails = async (req, res) => {
  const {walletAddress} = req.params;
  console.log(walletAddress,"walletAddress from doctorController111");
  try{
    const instance = await require("../exports/instanceExport").getInstance();
    const docId=await instance.getId(walletAddress);
    const doctor=await Doctor.findById(docId).select('-walletAddress -hospital -appointments -approvedBy');
    res.status(200).json({doctor});
    console.log(walletAddress,"walletAddress from doctorController");
  }catch(err){
    res.status(400).json({err:err.message});
  }
  
}

// doctor will uplad the medicine details , symtpoms and lab test details
const uploadPrescription = async (req, res) => {
  const {medicalInfo,labTestInfo,patientId,walletAddress}=req.body;
  // console.log(medicalInfo,labTestInfo,patientId,walletAddress,"medicalInfo,labTestInfo,patientId,walletAddress");
 const labTestInfojson=JSON.stringify(labTestInfo);
 const medicalInfojson=JSON.stringify(medicalInfo);
//  console.log(labTestInfojson,medicalInfojson,"labTestInfojson,medicalInfojson");
  try{
    var labTestInfoParsed=JSON.parse(labTestInfojson);
    var medicalInfoParsed=JSON.parse(medicalInfojson);
    // console.log(labTestInfoParsed,"labTestInfoParsed",medicalInfoParsed,"medicalInfoParsed");

    const {uploadfile}=await import ("../exports/ipfsHandler.mjs");
    // console.log(uploadfile,"uploadfile");
    const labTestInfoUploadResult=await uploadfile(labTestInfoParsed);
    console.log(labTestInfoUploadResult,"labTestInfoUploadResult")
    const medicalInfoResult=await uploadfile(medicalInfoParsed);
    const labTestInfoCid   = labTestInfoUploadResult.cid.toString();
    const medicalInfoCid = medicalInfoResult.cid.toString();
    console.log(labTestInfoCid,"labTestInfoCid",medicalInfoCid,"medicalInfoCid");
    const instance = await require("../exports/instanceExport").getInstance();
    await instance.setMedInfoHash(medicalInfoCid,labTestInfoCid,patientId,{from:walletAddress}); 
    res.status(200).json({"message":"success"});
  }catch(err){
    res.status(400).json({err:err.message});    
  }
}


  // lab technician will upload the lab report
  const setLabReport = async (req, res) => {
    const {labReport,patientId,prescriptionId,walletAddress}=req.body;
    console.log(labReport,"labReport",patientId,"patientId",prescriptionId,"prescriptionId",walletAddress,"walletAddress");
    const labReportjson=JSON.stringify(labReport);
    try{
      var labReportParsed=JSON.parse(labReportjson);
      const {uploadfile}=await import ("../exports/ipfsHandler.mjs");
      const labReportUploadResult=await uploadfile(labReportParsed);
      const labReportCid   = labReportUploadResult.cid.toString();
      const instance = await require("../exports/instanceExport").getInstance();
      await instance.setLabReportHash(labReportCid,patientId,prescriptionId,{from:walletAddress}); 
      res.status(200).json({"message":"success"});
    }catch(err){
      res.status(400).json({err:err.message});    
    }

  }


  // used to get the prescription count of a patient in order to get the prescription details
  const getPrescriptionCnt = async (req, res) => {
    const {patientId} = req.params;
    // const {patientWalletAddress} = req.params;
    try{
      const instance = await require("../exports/instanceExport").getInstance();
      const patientWalletAddress=await instance.getAddress(patientId);
      const prescriptionCnt=await instance.getPrescriptionCnt(patientWalletAddress);
      res.status(200).json({prescriptionCnt});
    }catch(err){
      res.status(400).json({err:err.message});
    }
  }

  // used by lab technicians while setting lab report 
  const getLabTestInfo = async (req, res) => {
    const {patientId,perscriptionId,labTechWalletAddress} = req.params;
    // console.log(patientId,perscriptionId,"patientId,perscriptionId",labTechWalletAddress,"labTechWalletAddress");
    try{
      const instance = await require("../exports/instanceExport").getInstance();
      const labTestInfoCid=await instance.requiredLabTest(patientId,perscriptionId,{from:labTechWalletAddress});
      // console.log(labTestInfoCid,"labTestInfoCid");
      const {getFile}=await import ("../exports/ipfsHandler.mjs");
      const labTestInfo=await getFile(labTestInfoCid);
      const finalLabTestInfo=JSON.parse(labTestInfo);
      res.status(200).json({finalLabTestInfo});
    }catch(err){  
      res.status(400).json({err:err.message});
    } 
  }

  // used by patient and doctor to get past prescriptions
  const getPrescription = async (req, res) => {
    const {patientId,perscriptionId,walletAddress} = req.params;
    console.log(patientId,perscriptionId,"patientId,perscriptionId");
    try{ 
      const instance = await require("../exports/instanceExport").getInstance();
      
      const prescriptionCid=await instance.getPrescription(patientId,perscriptionId,{from:walletAddress});
      console.log(prescriptionCid,"prescriptionCid")
      const {getFile}= await import ("../exports/ipfsHandler.mjs");
      let  prescription = "", labReport = "", labTestInfo = "";
      if(prescriptionCid[0] !== ""){
       const prescriptionTemp=await getFile(prescriptionCid[0]);
        prescription=JSON.parse(prescriptionTemp);
      }
      if(prescriptionCid[1] !== ""){
      //  const labReportTemp=await getFile(prescriptionCid[1]);
      //   labReport=JSON.parse(labReportTemp);

        const labTestInfoTemp=await getFile(prescriptionCid[1]);
         labTestInfo=JSON.parse(labTestInfoTemp);

      }
      if(prescriptionCid[2] !== ""){
       const labReportTemp=await getFile(prescriptionCid[2]);
        labReport=JSON.parse(labReportTemp);
      }
      res.status(200).json({prescription,labReport,labTestInfo});
    }catch(err){
      res.status(400).json({err:err.message});
    }
  }


    

  

module.exports = {
  registrationRequest,
  getAllPatients,
  getDocDetails,
  uploadPrescription,
  setLabReport,
  getPrescriptionCnt,
  getLabTestInfo,
  getPrescription

};
