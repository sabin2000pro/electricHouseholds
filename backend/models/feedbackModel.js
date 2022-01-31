const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({ // The Feedback Mongoos Schema
    feedbackUsername: {
        type: String,
        required: [true, 'You must specify username']
    },

    feedbackEmailAddress: {
        type: String,
        required: [true, 'You must provide an e-mail address'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Invalid E-mail Address"],
    },

    feedbackFeeling: {
        type: String,
        enum: ['Happy', 'Unhappy', 'Satisfied', 'Neutral', 'Very Happy'],
        required: [true, 'You must specify a feeling']
    },

    feedbackDescription: {
        type: String,
        minlength: 10,
        required: [true, 'You must specify description'],
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;