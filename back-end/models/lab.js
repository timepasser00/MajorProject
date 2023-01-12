const mongoose=require('mongoose');

const LabSchemma=new mongoose.Schema({
    name:{
        type:String,
         // required: true,
    },
    address:{
        type:String,
         // required: true,
    },
    specialities:{
        type:[String],
         // required: true,
    },
    contact:{
      type:String,
       // required: true,
    },
    walletAddress:{
        type:String,
         // required: true,
    }
});

const Lab=mongoose.model('Lab',LabSchemma);

module.exports=Lab;

