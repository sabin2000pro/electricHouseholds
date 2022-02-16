/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


const express = require('express');
const bidRouter = express.Router();
const rateLimit = require('express-rate-limit');
const bidsController = require('../controllers/bidsController'); // Import the bids controller

const bidLimiter = rateLimit({
    windowMs: 40 * 40 * 1000,
    max: 50,
    message: "Too many bids coming from this IP address. Try again after 30 minutes. Only 50 per 30 minutes"
});

bidRouter.route('/fetch-bids').get(bidLimiter, bidsController.getAllBids);
bidRouter.route('/fetch-openingbid/:id').get(bidsController.fetchOpeningBid);
bidRouter.route('/fetch-bid/:id').get(bidsController.fetchSingleBid);
bidRouter.route('/edit-bid/:id').put(bidsController.editBids);
bidRouter.route('/create-bid').post(bidLimiter, bidsController.createBid);
bidRouter.route('/delete-bids').delete(bidsController.deleteAllBids);

module.exports = bidRouter;