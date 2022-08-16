const router=require('express').Router();
const { BuyPackage } = require('../controllers/buyPackController');

router.post('/buypackage/register',BuyPackage.Register);
router.get('/buypackage/getbuypackagerequests',BuyPackage.GetPackageRequests);
router.patch('/buypackage/updatebuypackage/:id',BuyPackage.ConfirmPackage);
module.exports=router;