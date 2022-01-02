const express = require('express');
const timeslotRouter = express.Router();
const timeslotController = require('../controllers/timeslotsController');

timeslotRouter.route('/create-timeslot').post(timeslotController.createTimeslot);

module.exports = timeslotRouter;