const router=require('express').Router();
const multer =require('multer');
const { Catagory } = require('../controllers/catagoryController');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.filename+'-'+Date.now()+'-'+file.originalname)
    }
})
const upload=multer({
    storage:storage
}).single('catImage')

router.post('/catagory/register',upload,Catagory.Register);
router.get('/catagory/getcatagories',Catagory.GetCatagories);
module.exports=router;