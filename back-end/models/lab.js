const mongoose=require('mongoose');

const LabSchemma=new mongoose.Schema({
    name:{
        type:String,
         // required: true,
    },
    address: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Address',
          // required: true,
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
         // required: true,
    },
    contact:{
      type:String,
       // required: true,
    },
    walletAddress:{
        type:String,
         // required: true,
    },
    labTechs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'LabTech',
    }],

});

const Lab=mongoose.model('Lab',LabSchemma);

module.exports=Lab;

