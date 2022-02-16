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

const reviewSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: [true, 'Please submit your rating from 1-10'],
        min: 1,
        max: 10
    },

    review: {
        type: String,
        required: [true, 'Please submit your review text'],
        min: 10,
        max: 20
    },

    username: {
        type: String,
        required: [true, 'Please provide your Username']
    },

    reason: {
        type: String,
        required: [true, "Please provide the reason for this review"]
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;