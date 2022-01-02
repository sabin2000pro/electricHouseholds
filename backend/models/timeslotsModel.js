const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    earlyMorningSlots: [{
        type: String
    }],

    lateMorningSlots: [{type: String}],
    afternoonSlots: [{type: String}],
    eveningSlots: [{type: String}],
    otherHouseholdsRandom: [{type: String}]
})

const Timeslots = mongoose.model('Timeslots', timeslotSchema);
module.exports = Timeslots;