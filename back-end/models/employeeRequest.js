const mongoose = require("mongoose");
const EmployeeRequestSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  yearOfExperience: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
  },
  employeeType: {
    type: String,
    required: true,
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
  labId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lab",
  },
  walletAddress: {
    type: String,
    // required: true,
    // unique: [true, "Wallet Address already exists"],
  },
});
const EmployeeRequest = mongoose.model(
  "EmployeeRequest",
  EmployeeRequestSchema
);
module.exports = EmployeeRequest;
