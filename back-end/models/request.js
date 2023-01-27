const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Address",
    // required:true,
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
  specialities: {
    type: [String],
    // required:true,
  },
  contact: {
    //    type:String,
    //      required:true,
    type: String,
  
  },
    walletAddress: {
      type: String,
      // required:true,
      // unique:[true,"Wallet Address already exists"],
    },
});

module.exports = mongoose.model("Request", RequestSchema);
