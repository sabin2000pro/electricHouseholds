const Bid = require('../models/bidsModel');
const catchAsync = require('../middleware/catchAsync');
const ok = 200;
const created = 201;
const deleted = 204;
const serverError = 500;
const badRequest = 400;
const notFound = 404;

module.exports.getAllBids = catchAsync(async (request, response, next) => {
    
     const bidData = await Bid.find();
     const totalBids = await Bid.countDocuments({});
     console.log(totalBids);

     return response.status(ok).json(bidData);
   
})

module.exports.createBid = catchAsync(async (request, response, next) => {
   
    const {username, bid, virtualCredits} = request.body;

       if(!username || !bid) {
           return response.status(notFound).json({status: 'Fail', message: 'Invalid Bid Entries'});
        }

        const newBid = await Bid.create({username, bid, virtualCredits})
        await newBid.save(); // Save the new bid data to the database.

        return response.status(created).json("Bid Created");
    })

module.exports.editBids = catchAsync(async(request, response, next) => {
    const id = request.params.id;
    const updatedBid = await Bid.findByIdAndUpdate(id, request.body);
    
    return response.status(ok).json({message: 'Bid Updated', updatedBid});
});

module.exports.deleteBidById = catchAsync(async(request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(400).json({status: "Fail", message: "No bid found with that ID"});
    }

})

module.exports.deleteAllBids = async (request, response, next) => {

    if(request.method === 'DELETE') {
        await Bid.deleteMany();
        return response.status(deleted).json("All Bids Deleted");
    }
}