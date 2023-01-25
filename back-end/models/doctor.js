const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
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
  qualification: String,
    walletAddress: {
    type: String,
    // required: true,
    // unique: [true, "Wallet Address already exists"],
    },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
  },
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
