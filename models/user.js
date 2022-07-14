const mongoose = require("mongoose");
const userScheme=new mongoose.Schema({
    fullname:{type:String,default:'empty'},
    username:{type:String,default:'empty'},
    phone:{type:String,default:'empty'},
    email:{type:String,default:'empty'},
    password:{type:String,default:'empty'},
    cnic:{type:String,default:'empty'},
    province:{type:String,default:'empty'},
    city:{type:String,default:'empty'},
    permanentAddress:{type:String,default:'empty'},
    empPic:{type:String,default:'empty'},
    active:{type:Boolean,default:true}
});
module.exports=mongoose.model("Users",userScheme);