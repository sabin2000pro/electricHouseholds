

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Stores necessary data to create a new Administrator on the system
 * File Type: Model File
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'You must provide Admin Username']
    },

    emailAddress: {
        type: String,
        required: [true, 'Please specify Admin e-mail address'],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please make sure your e-mail is valid']
    },
    
    password: {
        type: String,
        required: [true, 'Please specify password'],
        min: [4, 'Passowrd length must be at LEAST 4 characters'],
        max: [15, 'Password lenght must be a MAX of 15 characters']
    },

    confirmPassword: {
        type: String,
        required: [false, 'Please confirm your password'],

        validate: {
            
            validator: function(value) { // Validate the confirm password to ensure they are the same
                 return value === this.password;
            },

            message: 'Please ensure the passwords are the same'
        }
    },

    passwordResetToken: String,
    passwordResetExpires: Date, // The date when the password expired
    passwordChangedAt: Date,

    account_active: {
        type: Boolean,
        default: true,
        select: false
    }
});

// Hash Password before saving to database

adminSchema.pre('save', async function(next) {

    if(!this.isModified('password')) { // If password is not already modified
        return next(); // Call next middleware
    }

    // Generate salt
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined; // Not needed

    return next();
});

adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    this.passwordChangedt = Date.now() - 1500;
    return next();
})

// Comapares entered password and the one in the database before logging in
adminSchema.methods.compareLoginPasswords = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.methods.getResetPasswordToken = function() { // Get the reset password token
    let method = 'sha256'; // Method Type

    const resetToken = crypto.randomBytes(20).toString("hex"); // Create the reset token
    this.passwordResetToken = crypto.createHash(method).update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * (60 * 1000); // 1 minute before expiration
    return resetToken; // Return the reset token
};

// Generates a unique JWT token for verifying the admin identity
adminSchema.methods.getAuthToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

const Admin = mongoose.model('Admin', adminSchema); // Turn the schema into a model
module.exports = Admin; // Export the Admin model