const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    timeslots: [String] // The timeslots is an array of strings containing the timeslots
})

const Timeslots = mongoose.model('Timeslots', timeslotSchema);
module.exports = Timeslots;