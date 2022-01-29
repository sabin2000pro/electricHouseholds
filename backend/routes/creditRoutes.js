const express = require('express');
const creditRouter = express.Router();
const creditController = require('../controllers/creditController');

creditRouter.route('/create-credits').post(creditController.createCredits);
creditRouter.route('/get-credits').get(creditController.getAllCredits);
creditRouter.route('/delete-credits').delete(creditController.deleteCredits);

module.exports = creditRouter;