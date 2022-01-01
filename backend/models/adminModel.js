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
        required: [true, 'Please specify password']
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

    if(!this.isModified('password')) {
        return next();
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

adminSchema.methods.compareLoginPasswords = async function(enteredPassword) {
    return bcrypt.compare(this.password, enteredPassword);
}

adminSchema.methods.generateResetPasswordToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
}

const Admin = mongoose.model('Admin', adminSchema); // Turn the schema into a model

module.exports = Admin; // Export the Admin model