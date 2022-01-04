// User Preferences Model to hold data about the users

const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'You must specify username please']
    },

    appliance: {
        type: String,
        required: [true, 'Please choose the appliance you want to run']
    },

    earlyMorningslot: {
        type: String,
        required: [true, 'Please submit early morning timeslot for when you want to run your appliance between 00:00-05:00AM']
    },

    lateMorningslot: {
        type: String,
        required: [true, 'Please enter a late morning slot between 06:00AM - 11:00AM']
    },

    afternoonSlot: {
        type: String,
        required: [true, 'Please enter an afternoon slot between 12:00PM and 17:00PM']
    },

    eveningSlot: {
        type: String,
        required: [true, 'Please enter an evening slot between 18:00PM - 23:00PM']
    }
});

const Preference = mongoose.model('Preference', preferencesSchema);
module.exports = Preference;