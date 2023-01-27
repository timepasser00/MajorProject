const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const AddressSchema=new Schema({
  
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
});
const Address=mongoose.model('Address',AddressSchema);
module.exports=Address;