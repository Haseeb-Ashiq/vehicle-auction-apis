const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{type:String,trim:true},
    price:{type:Number},
    auctionStartDate:{type:Date},
    auctionEndDate:{type:Date},
    detail:
          {
              productModel:{type:String},
              productBuyDate:{type:String},
              showRoom:{type:String},
              numberPlate:{type:String},
              cylender:{type:String},
              engineNumber:{type:String},
              milege:{type:String},
              transmision:{type:String,default:'Manual'},
              description:{type:String},
          },
    slug:{type:String,unique:true},
    catagory:{type:mongoose.Schema.Types.ObjectId,ref:'Catagories'},
    bids:[
        {
            user:{type:mongoose.Schema.Types.ObjectId,ref:'Users'},
            bid:{type:String},
            bidData:{type:Date}
        }
    ],
    productPictures:[{
        img:{type:String}
    }]

})

module.exports=mongoose.model('Products',productSchema);