// User Preferences Model to hold data about the users

const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'You must specify username please'],
        min: [10, 'Username must NOT be less than 10 characters'],
        max: [20, 'Username cannot exceed 20 characters']
    },

    appliance: {
        type: String,
        required: [true, 'Please choose the appliance you want to run']
    },

    image: {
        type: String,
        required: [true, 'Please submit image URL of the appliance you would like to run']
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