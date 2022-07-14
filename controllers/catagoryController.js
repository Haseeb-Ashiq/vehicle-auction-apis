const Catagories=require('../models/catagory');

exports.Catagory=Object.create({

    Register: async (req,res)=>{
        console.log(req.file);
        const catagory=new Catagories({
            name:req.body.name,
            image:req.file.filename
        })
        await catagory.save((error,cata)=>{
                 if(error) return res.status(400).json(error.message)
                 if(cata) return res.status(201).json({cata})
        });
        
    },
    GetCatagories:async (req,res)=>{
        await Catagories.find()
        .exec((error,cata)=>{
            if(error) return res.status(400).json(error.message)
            if(cata) return res.status(200).json({cata})
   })
    }

})