const mongoose = require('mongoose');

const buyPackageSachema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    package:{type:mongoose.Schema.Types.ObjectId,ref:'Packages'},
    dateOfRequest:{type:Date},
    packageConfirm:{type:Boolean,default:false},
    confirmDate:{type:Date}
},{
    timestamps:true
})
module.exports=mongoose.model('BuyPackages',buyPackageSachema);