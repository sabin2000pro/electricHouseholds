const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({

});

const Appliance = mongoose.model('Appliance', applianceSchema);
module.exports = Appliance; // Export the Appliance model