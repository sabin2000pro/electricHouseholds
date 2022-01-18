const express = require('express');
const bidRouter = express.Router();
const rateLimit = require('express-rate-limit');
const bidsController = require('../controllers/bidsController'); // Import the bids controller

const bidLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 50,
    message: "Too many bids coming from this IP address. Try again after 1 hour. Only 50 per hour"
});

bidRouter.route('/fetch-bids').get(bidLimiter, bidsController.getAllBids);
bidRouter.route('/fetch-openingbid/:id').get(bidsController.fetchOpeningBid);
bidRouter.route('/fetch-bid/:id').get(bidsController.fetchSingleBid);
bidRouter.route('/edit-bid/:id').put(bidsController.editBids);
bidRouter.route('/create-bid').post(bidLimiter, bidsController.createBid);
bidRouter.route('/delete-bids').delete(bidsController.deleteAllBids);

module.exports = bidRouter;