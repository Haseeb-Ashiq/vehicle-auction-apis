const { Package } = require('../controllers/packageController');

const router=require('express').Router();

router.post('/package/register',Package.Register);
router.get('/package/getpackages',Package.GetPackages);
router.patch('/package/status/:id',Package.Status);
router.patch('/package/update/:id',Package.Update);
module.exports=router;