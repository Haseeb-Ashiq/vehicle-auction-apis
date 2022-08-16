const Packages=require('../models/package');

exports.Package=Object.create({
Register:async (req,res) => {
    const {name,price,bids}=req.body;
    const _package=new Packages({
        name,
        price,
        bids,
        active:true
    })
    await _package.save((error,package)=>{
        if(error) return res.status(400).json(error.message)
        if(package) return res.status(201).json({package})
    })
},
GetPackages:async (req,res) => {
    await Packages.find()
    .exec((error,packages)=>{
        if(error) return res.status(400).json(error.message)
        if(packages) return res.status(200).json({packages})
    })
},
Status:async (req,res) => {
    const {id}=req.params;
    await Packages.findByIdAndUpdate({_id:id},{active:req.body.status},{new:true})
    .exec((error,package)=>{
        if(error) return res.status(400).json(error.message)
        if(package) return res.status(201).json({package})
    })
},
Update:async (req,res) => {
    const {id}=req.params;
    await Packages.findByIdAndUpdate({_id:id},{...req.body},{new:true})
    .exec((error,package)=>{
        if(error) return res.status(400).json(error.message)
        if(package) return res.status(201).json({package})
    })
}
})