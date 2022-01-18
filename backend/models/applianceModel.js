const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({ // Appliance Schema
    name: {
        type: String,
        required: [true, 'You must specify the appliace name you want to create']
    },

    description: {
        type: String,
        required: [true, 'Please specify a description for your appliance']
    }
    
});

const Appliance = mongoose.model('Appliance', applianceSchema);
module.exports = Appliance; // Export the Appliance model