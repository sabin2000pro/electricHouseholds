const Bid = require('../models/bidsModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const deleted = 204;
const serverError = 500;
const badRequest = 400;
const notFound = 404;

module.exports.getAllBids = catchAsync(async (request, response, next) => {
    
     const bidData = await Bid.find();
     return response.status(ok).json({bidData});
});

module.exports.fetchSingleBid = catchAsync(async (request, response, next) => {
    const id = request.params.id;
    const singleBid = await Bid.findById(id);

    return response.status(200).json({singleBid});
});

module.exports.fetchOpeningBid = catchAsync(async (request, response, next) => {
    const id = request.params.id;
    const bidData = await Bid.findById(id);

    return response.status(200).json({openingBid: bidData.openingBid});
});

// @ Middleware Function Description: Used to create a bid by allowing a POST request to the server
module.exports.createBid = catchAsync(async (request, response, next) => {
   
       const {nickname, bid, virtualCredits, openingBid, username, reputationPoints, creditsLeft, nextRoundBid, finalRoundBid} = request.body;

      
        const newBid = await Bid.create({nickname, bid, virtualCredits, openingBid, username, reputationPoints, creditsLeft, nextRoundBid, finalRoundBid});
        await newBid.save(); // Save the new bid data to the database.

        return response.status(created).json({newBid});
})

module.exports.editBids = catchAsync(async(request, response, next) => {
    const id = request.params.id;

    const updatedBid = await Bid.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
    await updatedBid.save();
    
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