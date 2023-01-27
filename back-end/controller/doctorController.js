const Patient = require("../models/patient");
const mongoose = require("mongoose");
const Doctor=require("../models/doctor");
const Hospital=require("../models/hospital");

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

const registerWithHospital = async (req, res) => {
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




// module.exports = {
//     registerWithHospital
// };

