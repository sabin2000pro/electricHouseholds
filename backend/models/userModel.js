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
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },

    forename: {
        type: String,
        required: [true, 'Please include your first name']
    },

    surname: {
        type: String,
        required: [true, 'Please include your surname']
    },

    emailAddress: {
        type: String,
        required: [true, 'Please include your E-mail Address']
    },

    password: {
        type: String,
        required: [true, 'Please submit your password']
    },

    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password']
    },

    createdAt: Date,
    passwordResetToken: String,
    passwordResetAt: Date,
    accountValid: {

        type: Boolean,
        default: false,
        required: [true, '']
    }

});
