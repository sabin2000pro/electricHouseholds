const express = require('express');
const timeslotRouter = express.Router();
const timeslotController = require('../controllers/timeslotsController');

timeslotRouter.route('/create-timeslot').post(timeslotController.createTimeslot);
timeslotRouter.route('/fetch-timeslots').get(timeslotController.fetchAllTimeslots);

module.exports = timeslotRouter;