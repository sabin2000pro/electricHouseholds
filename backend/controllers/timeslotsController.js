/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const Timeslots = require('../models/timeslotsModel');
const catchAsync = require('../utils/catchAsync');

const ok = 200;
const created = 201;
const noContent = 204;

module.exports.createTimeslot = catchAsync(async(request, response, next) => {

   const {earlyMorningSlots, lateMorningSlots, afternoonSlots, eveningSlots, otherHouseholdsRandom} = request.body

   const newTimeslot = new Timeslots({earlyMorningSlots, lateMorningSlots, afternoonSlots, eveningSlots, otherHouseholdsRandom});
   await newTimeslot.save();
   return response.status(created).json({newTimeslot});
   
});

module.exports.fetchAllTimeslots = catchAsync(async (request, response, next) => {
    if(request.method === 'GET') {

        const allTimeslots = await Timeslots.find();
        return response.status(200).json({allTimeslots});
    }
    
})

module.exports.deleteAllTimeslots = catchAsync(async (request, response, next) => {

    if(request.method === 'DELETE') {
        await Timeslots.deleteMany();

        return response.status(204).json('All timeslots deleted');
    }
})