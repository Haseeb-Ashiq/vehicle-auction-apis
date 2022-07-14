const mongoose=require('mongoose');

const bidSchema=new mongoose.Schema({
    product:{type:mongoose.Schema.Types.ObjectId,ref:'Products'},
    auctionNo:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
    bid:{type:String},
    bidDate:{type:Date}
},{
    timestamps:true
})
module.exports=mongoose.model('Bids',bidSchema);