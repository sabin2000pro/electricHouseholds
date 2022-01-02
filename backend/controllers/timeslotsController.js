const Timeslots = require('../models/timeslotsModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createTimeslot = catchAsync(async(request, response, next) => {
   const {timeslots} = request.body;
   const Timeslot = new Timeslots({timeslots});
   await Timeslot.save();

   return response.status(201).json({timeslots});
});