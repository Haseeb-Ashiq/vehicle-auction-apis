const { User } = require("../controllers/userController");
const router=require("express").Router();
const path=require('path');
const multer=require('multer');
// const { ClientLoginAuth } = require("../middleware/client-auth");
const storage=multer.diskStorage({
     destination:function(req,file,cb)
     {
         cb(null,'./uploads/')
     },
     filename:function(req,file,cb)
     {
        cb(null,file.filename+'-'+Date.now()+'-'+path.extname(file.originalname))
     }
})
const upload=multer({
    storage:storage,
}).single('userPicture');
router.post('/user/register',upload,User.Register);
router.get('/user/getusers',User.GetUsers);
router.post('/user/login',User.Login);
router.get('/user/getuser/:id',User.GetUser);
router.patch('/user/updateuser/:id',User.UpdateUser);
router.patch('/user/activestatusupdate/:id',User.ActiveStatusUpdate);
router.patch('/user/userprofileupdate/:id',upload,User.UserProfileUpdate);
module.exports=router; 