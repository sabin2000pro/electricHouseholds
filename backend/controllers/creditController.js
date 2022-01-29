const Credit = require('../models/creditModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;

module.exports.createCredits = catchAsync(async (request, response, next) => {
    const {openingBid, virtualCredits} = request.body;

    const newCredit = new Credit({openingBid, virtualCredits});
    await newCredit.save();

    return response.status(201).json("Credits Created");
});

module.exports.deleteCredits = catchAsync(async (request, response, next) => {

});