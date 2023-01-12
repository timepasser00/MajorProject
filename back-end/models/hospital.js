const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  specialties: [String],
  doctors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  }],
  walletAddress: {
    type: String,
    // required: true,
    // unique: [true, "Wallet Address already exists"],
  },
  contact: {
    phone: String,
    email: String,
  },
});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
