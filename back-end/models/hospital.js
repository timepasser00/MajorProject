const mongoose = require('mongoose');


const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {

    city:{
      type:String,
  },
  state:{
      type:String,
  },
  country:{
      type:String,
  },
  pincode:{
      type:String,
  }
  },
  specialities:{
    type:[String],
  }, 
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
    type: String,
    // required: true,
    // unique: [true, "Contact already exists"],
  },

});

const Hospital = mongoose.model('Hospital', HospitalSchema);

module.exports = Hospital;
