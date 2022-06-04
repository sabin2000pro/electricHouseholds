
/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Stores necessary data in the form of an object to create a new Bid on the system
 * File Type: Model File
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    bid: { // The Initial Bid
        type: Number,
        minlength: [20, "min bid you can place is 20"],
        max: [2000, 'Max bid you can place is 2000']
    },

    nextRoundBid: { // The next round bid
        type: Number
    },

    lastRoundBid: {
        type: Number
    },

    creditsLeft: { // Number of credits left
        type: String
    },

    reputationPoints: { // Reputation Points field
        type: String,
        default: 0,
        min: [10, 'You can have a minimum of 10 reputation points'],
        max: [100, 'You can have a maximum of 100 reputation pointsc']
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;