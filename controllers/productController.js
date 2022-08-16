const Products=require('../models/product');

exports.Product=Object.create({

    Register:async (req,res) => {
        const {name,auctionEndDate,catagory,productModel,
            productBuyDate,
            showRoom,
            numberPlate,
            cylender,
            engineNumber,
            milege,
            transmision,
            description}=req.body;
        const product=new Products({
            name,
            auctionStartDate:new Date().toLocaleDateString(),
            auctionEndDate,
            catagory,
            detail:{
                productModel,
                productBuyDate,
                showRoom,
                numberPlate,
                cylender,
                engineNumber,
                milege,
                transmision,
                description
            },
            slug:name,
            productPictures:req.files.map((img)=>{
                return {img:img.filename}
            })
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
    GetOneProduct:async (req,res)=>{
        await Products.findOne({_id:req.params.id})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_pro});
        })
    },
    Update:async(req,res)=>{
        const {id}=req.params;
        await Products.findByIdAndUpdate({_id:id},{...req.body,productPictures:req?.files?.filename},{new:true})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_updatedProduct:_pro});
        })

    },
    Delete:async (req,res)=>{
        const {id} = req.params;
        await Products.findByIdAndUpdate({_id:id},{...req.body},{new:true})
        .exec( async (_error,_pro) => {
            if(_error) return await res.status(400).json(_error);
            if(_pro) return await res.status(200).json({_pro});
        })
    }
    

})