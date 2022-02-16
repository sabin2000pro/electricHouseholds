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


const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    earlyMorningSlots: [{
        type: String
    }],

    lateMorningSlots: [{type: String}],
    afternoonSlots: [{type: String}],
    eveningSlots: [{type: String}],
    otherHouseholdsRandom: [{type: String}]
})

const Timeslots = mongoose.model('Timeslots', timeslotSchema);
module.exports = Timeslots;