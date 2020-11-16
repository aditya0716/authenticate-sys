const mongoose=require('mongoose');
//Schema contains name email password in hash format and otp if generated
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        default:'#####',
    }
  
},{
    timestamps:true,
});
const user=mongoose.model('user',userschema);
module.exports=user;