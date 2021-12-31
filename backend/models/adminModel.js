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

        validate: function(value) {
            return this.password === value;
        }
    },

    passwordResetToken: String,
    passwordResetAt: Date
});

// Hash Password before saving to database

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; // Export the Admin model