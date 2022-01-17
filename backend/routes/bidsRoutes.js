const express = require('express');
const bidRouter = express.Router();
const bidsController = require('../controllers/bidsController'); // Import the bids controller

bidRouter.route('/fetch-bids').get(bidsController.getAllBids);
bidRouter.route('/create-bid').post(bidsController.createBid);
bidRouter.route('/delete-bids').delete(bidsController.deleteAllBids);

module.exports = bidRouter;