const Products=require('../models/product');

exports.Product=Object.create({

    Register:async (req,res) => {
        const product=new Products({
            name:'Honda Civic',
            price:'350000',
            auctionStartDate:new Date().getTime(),
            auctionEndDate:new Date('2022-07-10').getTime(),
            detail:{
                productModel:'Fa 2015',
                productBuyDate:'2015-06-03',
                showRoom:'Multan Honda Car Center',
                numberPlate:'MHA 3344',
                cylender:'4',
                milege:'65km/1ltr',
                transmision:'Automatic',
                engineNumber:'HONDA-CA-5001',
                description:'Honda civic new Variant by honda company running millege is out stadding.'
            },
            slug:'hondacivic6',
            catagory:'62c7a6aae2eb9a771ea9d299',
            productPictures:[
                {
                    img:'honda-front-pic.jpg'
                }
                ,
                {
                    img:'honda-back-pic.jpg'
                }
            ]
        })
        await product.save((error,pro)=>{
                if(error) return res.status(400).json(error.message)
                if(pro) return res.status(201).json({pro})
        })
    },
    GetProducts:async (req,res) => {
        await Products.find()
        .exec((error,pro)=>{
            if(error) return res.status(400).json(error.message)
            if(pro) return res.status(200).json({pro})
        })
    },
    GetProductById:async(req,res)=>{
        await Products.find({catagory:req.params.id})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_pro});
        })
    },
    Update:async(req,res)=>{
        const {id}=req.params;
        await Products.findByIdAndUpdate(id,{...req.body},{new:true})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_updatedProduct:_pro});
        })

    },
    AddBid:async (req,res)=>{
        const {id}=req.params;
        let bids=req.body.bids.map((_bid)=>{
            return {user:_bid.user,bid:_bid.bid,bidDate:Date.now()}
        })
        console.log(bids);
        // await Products.findByIdAndUpdate(id,{bids},{new:true})
        // .exec( async (_error,_pro) => {
        //     if(_error) return await res.status(400).json(_error);
        //     if(_pro) return await res.status(200).json({_updatedProduct:_pro});
        // })
    },
    Delete:async (req,res)=>{
        await Products.findByIdAndDelete({_id:req.params.id})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({message:'deleted successfull'});
        })
    }
    

})