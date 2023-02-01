const Hospital = require('../models/hospital');
const Request = require('../models/request');
const Doctor=require('../models/doctor');
const Address=require('../models/address');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_SECRET);

const registerRequest = async (req, res) => {

    console.log(req.body,"from function");
    const{type,name,contact,address,specialities,walletAddress}=req.body;

    const encryptedWalletAddress = cryptr.encrypt(walletAddress);


    try{
        
        const request= await Request.create({type,name,contact,
            address:address,
            specialities,
            walletAddress:encryptedWalletAddress});
        res.status(200).json({request});
    }catch(err){
        res.status(400).json({err:err.message});
    }

}
const allRequests = async (req, res) => {
    try {
        const requests= await Request.find();
        res.send(requests)
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}
const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.send(hospitals)
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
}
const registerDoctor = async (req, res) => {
    const  {firstName,lastName,yearOfExperience,qualification}=req.body;
     console.log(firstName,lastName,yearOfExperience,qualification);
        const hospitalId=req.params.id;
 
     try{
         const hospital=await Hospital.findById(hospitalId);
         console.log(hospital);
         
         const doctor=await Doctor.create({firstName,lastName,yearOfExperience,qualification,hospital:hospitalId});
         console.log(doctor,"doctor");
         hospital.doctors.push(doctor._id);
            hospital.save();
         res.status(200).json({doctor});
     }catch(err){
         res.status(400).json({err:err.message});
     }
 }
 const removeDoctor = async (req, res) => {
   const doctorId=req.params.id;
    try{
        const doctor=await Doctor.findById(doctorId);
        const hospitalId=doctor.hospital;
        const hospital=await Hospital.findById(hospitalId);
        hospital.doctors.pull(doctorId);
        hospital.save();
        doctor.remove();
        res.status(200).json({doctor});
    }catch(err){
        res.status(400).json({err:err.message});
    }
}
const getAllDoctors = async (req, res) => {
    const hospitalId=req.params.id;
    try{
        const hospital=await Hospital.findById(hospitalId).populate("doctors");
        const doctors=hospital.doctors;
        res.status(200).json({doctors});
    }catch(err){
        res.status(400).json({err:err.message});
    }

}





module.exports={
    registerRequest,
    allRequests,
    getAllHospitals,
    registerDoctor,
    removeDoctor,
    getAllDoctors
}