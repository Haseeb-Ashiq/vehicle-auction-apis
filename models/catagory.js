const mongoose= require("mongoose");
const catagorySchema=new mongoose.Schema({
    name:{type:String},
    image:{type:String}
});
module.exports=mongoose.model('Catagories',catagorySchema);