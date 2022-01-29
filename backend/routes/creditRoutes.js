const express = require('express');
const creditRouter = express.Router();
const creditController = require('../controllers/creditController');

creditRouter.route('/create-credit').post(creditController.createCredits);
creditRouter.route('/delete-credits').delete(creditController.deleteCredits);

module.exports = creditRouter;