const { Bid } = require('../controllers/bidController');

const router=require('express').Router();

router.post('/bid/addbid',Bid.AddBid);
router.get('/bid/getbids',Bid.GetBids);
router.get('/bid/getbidsbyid/:id',Bid.GetBidsById);
router.get('/bid/result/:auctionNo',Bid.Result);
router.get('/bid/getbidsbyuserid/:id',Bid.GetBidsByUserId)
module.exports=router;