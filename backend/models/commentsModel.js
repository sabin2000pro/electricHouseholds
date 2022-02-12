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

const commentSchema = new mongoose.Schema({ // The Comment Model Schema
    
    commentTitle: {
        type: String,
        required: [true, 'You must provide a comment']
    },

    commentUsername: {
        type: String,
        required: [true, 'Please specify username']
    },

    commentReason: {
        type: String,
        required: [true, 'Please describe the reason']
    },

    commentDescription: {
        type: String,
        required: [true, 'Please provide comment description']
    },

    createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;