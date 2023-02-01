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
  appointments: [
    {
      date: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', 
      },
    },
  ], 
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = Doctor;
