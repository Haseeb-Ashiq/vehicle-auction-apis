const BuyPackages = require('../models/buypackage');

exports.BuyPackage=Object.create({
    Register:async (req,res) =>{
        const {user,package} = req.body;
        const buyPkg=new BuyPackages({
           user,
           package,
           dateOfRequest:new Date().toLocaleDateString(),
           confirmDate:''
        })
        await buyPkg.save((error,pkg)=>{
            if(error) return res.status(400).json(error.message)
            if(pkg) return res.status(201).json({buyPackage:pkg})
        })
    },
    GetPackageRequests:async (req,res)=>{
        await BuyPackages.find()
        .populate({path:'user',select:'_id fullname username email phone empPic'})
        .populate({path:'package',select:'_id name price bids'})
        .exec((error,pkg)=>{
            if(error) return res.status(400).json(error.message)
            if(pkg) return res.status(200).json({buyPackageRequests:pkg})
        })
    },
    ConfirmPackage:async (req,res) => {
        const {id}=req.params;
        console.log({id:req.params,status:req.body.status})
        await BuyPackages.findByIdAndUpdate({_id:id},{packageConfirm:req.body.status,confirmDate:new Date().toLocaleDateString()},{new:true})
        .populate({path:'user',select:'_id fullname username email phone empPic'})
        .populate({path:'package',select:'_id name price bids'})
        .exec((error,pkg)=>{
            if(error) return res.status(400).json(error.message)
            if(pkg) return res.status(201).json({updateBuyPackage:pkg})
        })
    }
})