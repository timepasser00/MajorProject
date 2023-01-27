const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const DocRequestSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Address',
        // required:true,
    },
    qualification:{
        type:[String],
        // required:true,
    },
    contact:{
        type:String,
        // required:true,
    },
    walletAddress:{
        type:String,
        // required:true,
    }
});
const DocRequest=mongoose.model('DocRequest',DocRequestSchema);
module.exports=DocRequest;