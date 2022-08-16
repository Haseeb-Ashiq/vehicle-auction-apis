const mongoose=require('mongoose');

const packageSchema=new mongoose.Schema({
    name:{type:String},
    price:{type:String},
    bids:{type:String},
    active:{type:Boolean},
})
module.exports=mongoose.model('Packages',packageSchema);