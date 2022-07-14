const router=require('express').Router();
const multer=require('multer');
const { Product } = require('../controllers/productController');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename:function(req,file,cb){
        cb(null,file.filename+'-'+Date.now()+'-'+file.originalname);
    }
})
const upload=multer({
    storage:storage
}).array('productPicture',4);

router.post('/product/register',upload);
router.get('/product/getSave',Product.Register);
router.get('/product/getproducts',Product.GetProducts);
router.get('/product/getproductbyid/:id',Product.GetProductById);
router.patch('/product/addbid/:id',Product.AddBid);
module.exports=router;