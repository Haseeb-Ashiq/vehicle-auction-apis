const Users =require('../models/user');
const jwt=require('jsonwebtoken');
exports.User=Object.create({
    Register:async (req,res) =>{
                try {
            const { fullname,email,password} = req.body;
            console.log({fullname,email,password})
            console.log(req.file)
            const user=new Users({
                fullname,
                email,
                password,
                active:true,
                empPic:req.file.filename
            });
            
            await user.save( async (_error,_user)=>{
                if(_error) return await res.status(400).json({_error});
                if(_user){
                    // const token=jwt.sign({userID:_client._id},process.env.secret_key_jwt,{expiresIn:'5d'})
                    return await res.status(201).json({_user:_user});
                }
                
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    Login: async( req,res)=>{
        try {
           
            const {email,password} = req.body;
            console.log(req.body)
            await Users.findOne({email:email})
            .exec((_error,_user)=>{
                if(_error) return res.status(400).json(_error);
                if(_user)
                {
                    if(_user.password===password)
                    {
                        // const token=jwt.sign({userID:_client._id},process.env.secret_key_jwt,{expiresIn:'5d'})
                        return res.status(200).json({_user});
                    }
                    else{
                        return res.status(200).json({_user:'password not matching'});
                    }
                }
            })

        } catch (error) {
            return await res.status(500).json({error:error.message})
        }
    },
    GetUser: async (req,res) => {
        try {
            await Users.findById({_id:req.body.params})
            .exec(async (_error,_user)=>{
                if(_error) return await res.status(400).json({_error});
                if(_user) return await res.status(200).json({_user});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    GetUsers: async (req,res) => {
        try {
            await Users.find()
            .exec( async (_error,_user) => {
                if(_error) return await res.status(400).json({_error});
                if(_user) return await res.status(200).json({_user});
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    UpdateUser: async (req,res) => {
        try {
            const { firstName,lastName,phone,email,
                cnic,province,city,permanentAddress} = req.body;
            await Users.findByIdAndUpdate({_id:req.body.params},
                {firstName,lastName,phone,email,cnic,province,city,permanentAddress},
                {new:true})
            .exec( async (_error,_user) => {
                if(_error) return await res.status(400).json({_error});
                if(_user) return await res.status(201).json({_user})
            })
        } catch (error) {
            return await res.status(500).json({error});
        }
    },
    ActiveStatusUpdate: async (req,res) => {
        const {id}=req.params;
        await Users.findByIdAndUpdate({_id:id},{...req.body},{new:true})
        .exec( async (_error,_user) => {
            if(_error) return await res.status(400).json({_error});
            if(_user) return await res.status(201).json({_user})
        })
    }
    ,
    UserProfileUpdate: async (req,res) => {
        const {id}=req.params;
        console.log(req.file)
        await Users.findByIdAndUpdate({_id:id},{...req.body,empPic:req?.file?.filename},{new:true})
        .exec( async (_error,_user) => {
            if(_error) return await res.status(400).json({_error});
            if(_user) return await res.status(201).json({_user})
        })
    }

})