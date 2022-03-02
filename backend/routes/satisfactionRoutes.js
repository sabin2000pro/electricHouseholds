const express = require('express');
const satisfactionRouter = express.Router();
const satisfactionController = require('../controllers/satisfactionController');

satisfactionRouter.route('/create-satisfaction', satisfactionController.createSatisfaction);

module.exports = satisfactionRouter;