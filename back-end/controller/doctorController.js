const Patient = require("../models/patient");
const mongoose = require("mongoose");


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