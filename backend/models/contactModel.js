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

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your First Name'],
        min: [15, 'First name must not exceed 10 characters'],
        max: [20, 'First name must not exceed 20 characters']
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },

    username: {
        type: String,
        required: [true, 'Please provide the Username you signed up with'],
        min: [10, 'Username must not exceed 10 characters']
    },

    emailAddress: {
        type: String,
        required: [true, 'Please provide the E-mail you signed up with']
    },

    issueType: {
        type: String,
        required: [true, 'Please include what the kind of issue you are encountering'],
        enum: ['Homepage', 'Algorithms', 'Preferences', 'Register', 'Login']
    },

    description: { // Description Field
        type: String,
        required: [true, 'Please provide a description of your problem']
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact; // Export the Contact Schema