const Patient = require("../models/patient");
const mongoose = require("mongoose");
const Hospital = require("../models/hospital");

const registerDetails = async (req, res) => {
  const { firstName, lastName, email,walletAddress,age } = req.body;
  console.log(firstName, lastName, email,walletAddress,age);
  try {
    const patient = await Patient.create({ firstName, lastName, age,walletAddress,email });
    res.status(200).json({ patient });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }

};
const getDetails = async (req, res) => {
    const {walletAddress} = req.body;
console.log("walletAddress",walletAddress);
    try {
        const patient = await Patient.find({walletAddress:walletAddress});
        console.log(patient)
        res.status(200).json( {patient} );
        } catch (err) {
        res.status(400).json({ err: err.message });
        }
};
// const searchPatient = async (req, res) => {
//     const {query} = req.params;
//     console.log("query",query);
//     try {
//       const hospital=await Hospital.find({
//         $or: [
//           { name: { $regex: query, $options: "i" } },
//           { address: { $regex: query, $options: "i" } },
//           { city: { $regex: query, $options: "i" } },
//           { state: { $regex: query, $options: "i" } },
//           { country: { $regex: query, $options: "i" } },
//           { pincode: { $regex: query, $options: "i" } },
//         ],

//       });
//       res.status(200).json({ hospital });
//     } catch (err) {
//       res.status(400).json({ err: err.message });
//     }
//   }; 
  const searchHospital= async (req, res) => {
    const {query} = req.params;
    console.log("query",query);
    try {
      const searchRegex=new RegExp(query,'i');
      const hospital=await Hospital.find({
        $or: [
          { name:  searchRegex  },
          // { address:  searchRegex  },
          // { city:  searchRegex  },
          // { state:  searchRegex  },
          // { country:  searchRegex  },
          // { pincode: searchRegex  },
          {'address.state':searchRegex},
          {contact:searchRegex}
        ],

      });
      res.status(200).json( hospital );
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };



    

module.exports = {
  registerDetails,
    getDetails,
  
    searchHospital
};
