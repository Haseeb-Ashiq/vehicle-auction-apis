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

router.post('/product/register',upload,Product.Register);
router.get('/product/getproducts',Product.GetProducts);
router.get('/product/getproductbyid/:id',Product.GetProductById);
router.get('/product/getoneproduct/:id',Product.GetOneProduct);
router.patch('/product/delete/:id',Product.Delete);
router.patch('/product/update/:id',upload,Product.Update);
module.exports=router;