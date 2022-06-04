// User Preferences Model to hold data about the users

const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
    
    appliance: {
        type: String
    },

    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },

    firstPreference: {
        type: String,
        required: [true, 'Please submit first timeslot preference']
    },

    secondPreference: {
        type: String,
        required: [true, 'Please submit your fsecond timeslot preference']
    },

    thirdPreference: {
        type: String,
        required: [true, 'Please submit your third timeslot preference']
    },

    nextAppliance: {
        type: String
    },

    lastAppliance: {
        type: String
    }

});

const Preference = mongoose.model('Preference', preferencesSchema);
module.exports = Preference;