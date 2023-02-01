const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    walletAddress: {
      type: String,
      // required: true,
      // unique: [true, "Wallet Address already exists"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    approvedDoctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    approvedLabs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lab",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
