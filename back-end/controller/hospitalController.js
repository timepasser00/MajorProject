const Hospital = require('../models/hospital');
const Request = require('../models/request');
const Doctor=require('../models/doctor');
const Address=require('../models/address');

const registerRequest = async (req, res) => {
    console.log(req.body,"from function");
    const{type,name,contact,address,specialities,walletAddress}=req.body;
    try{
        
        const request= await Request.create({type,name,contact,
            address:address,
            specialities,
            walletAddress});
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
    const  {firstName,lastName,yearOfExperience,qualification,hospitalId}=req.body;
     console.log(firstName,lastName,yearOfExperience,qualification,hospitalId);
 
     try{
         const hospital=await Hospital.findById(hospitalId);
         
         const doctor=await Doctor.create({firstName,lastName,yearOfExperience,qualification,hospital});
         hospital.doctors.push(doctor);
         res.status(200).json({doctor});
     }catch(err){
         res.status(400).json({err:err.message});
     }
 }



module.exports={
    registerRequest,
    allRequests,
    getAllHospitals,
    registerDoctor
}