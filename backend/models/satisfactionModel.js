const mongoose = require('mongoose');

const SatisfactionSchema = new mongoose.Schema({

    satisfaction: {
        type: String,
        required: [true, 'You must select an option'],
        enum: ['Very Happy', 'Happy', 'Neutral', 'Unhappy', 'Very Unhappy']
    },

    reason: {
        type: String,
        required: [true, 'Please give your reason as to why.'],
    }
});

const Satisfaction = mongoose.model('Satisfaction', SatisfactionSchema);
module.exports = Satisfaction;