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
        required: [true, 'Please specify Admin e-mail address']
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

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;