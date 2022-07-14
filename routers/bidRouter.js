const { Bid } = require('../controllers/bidController');

const router=require('express').Router();

router.post('/bid/addbid',Bid.AddBid);
router.get('/bid/getbids',Bid.GetBids);
router.get('/bid/getbidsbyid/:id',Bid.GetBidsById);
router.get('/bid/winner/:auctionNo',Bid.Result)
module.exports=router;