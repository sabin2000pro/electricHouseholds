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
    }
});

const Preference = mongoose.model('Preference', preferencesSchema);
module.exports = Preference;