const express = require('express');
const bidRouter = express.Router();
const bidsController = require('../controllers/bidsController'); // Import the bids controller

bidRouter.route('/fetch-bids').get(bidsController.getAllBids);
bidRouter.route('/fetch-openingbid/:id').get(bidsController.fetchOpeningBid);
bidRouter.route('/fetch-bid/:id').get(bidsController.fetchSingleBid);
bidRouter.route('/edit-bid/:id').put(bidsController.editBids);
bidRouter.route('/create-bid').post(bidsController.createBid);
bidRouter.route('/delete-bids').delete(bidsController.deleteAllBids);

module.exports = bidRouter;