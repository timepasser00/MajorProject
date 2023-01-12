const Patient = require("../models/patient");
const mongoose = require("mongoose");

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
        res.status(200).json( patient );
        } catch (err) {
        res.status(400).json({ err: err.message });
        }
};

module.exports = {
  registerDetails,
    getDetails
};
