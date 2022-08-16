const Bids=require('../models/bid');
const Products=require('../models/product');
exports.Bid=Object.create({
    AddBid:async (req,res) => {
        const eventEmitter=req.app.get('eventEmitter');
        const {product,auctionNo,user,bid}=req.body;
        const _bid=new Bids({
            product,
            auctionNo,
            user,
            bid,
            bidDate:Date.now()
        });
        await _bid.save((_error,_bids)=>{
             if(_error) return res.status(400).json(_error.message)
             if(_bids) 
             {
                 eventEmitter.emit('BidAdded',{_bids})
                 return res.status(201).json({_bids})
             }
        })
    },
    GetBids:async (req,res)=>{
        let bid_list=await Bids.find()
        .select('_id auctionNo bid bidDate auctionEndDate')
        .populate({path:'product',select:'_id name auctionEndDate'})
        .populate({path:'user',select:'_id fullname username email empPic'})
        .exec()

        res.status(200).json({bid_list});
    },
    GetBidsById:async (req,res) => {
        let bid_list=await Bids.find({auctionNo:req.params.id})
        .select('_id auctionNo bid bidDate auctionEndDate')
        .populate({path:'product',select:'_id name auctionEndDate productPictures'})
        .populate({path:'user',select:'_id fullname username email phone cnic city province permanentAddress empPic'})
        .exec()
        res.status(200).json({bid_list});
    },
    GetBidsByUserId:async (req,res) => {
        let bid_list=await Bids.find({user:req.params.id})
        .select('_id auctionNo bid bidDate auctionEndDate')
        .populate({path:'product',select:'_id name auctionEndDate productPictures'})
        .populate({path:'user',select:'_id fullname username email phone cnic city province permanentAddress empPic'})
        .exec()
        res.status(200).json({bid_list});
    },
    Result:async (req,res) => {
        const {auctionNo} = req.params;
        console.log(auctionNo)
        let pro=await Products.findOne({_id:auctionNo})
        .exec()
        if(pro.auctionEndDate > Date.now())
        {
        const result=await Bids.find({auctionNo:auctionNo})
        .select('_id auctionNo bid bidDate')
        .populate({path:'product',select:'_id name auctionStartDate auctionEndDate'})
        .populate({path:'user',select:'_id fullname username email phone empPic'})
        .exec()

        res.status(200).json({result:result.sort((a,b) => b.bid - a.bid)})
        }
        else {
            res.status(200).json({message:'auction is Continue...'})
        }
    }
})