const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    virtualCredits: {
        type: Number,
        default: 0,
        required: [true, 'You must specify how many Virtual Credits should be assigned by default'],
        min: [50, 'Minimum number of Virtual Credits must be £50'],
        max: [100, 'Maximum number of virtual credits should be £100']
    },

    openingBid: { // The opening bid
        type: Number,
        default: 50,
        required: [true, 'You must specify an opening bid']
    },

    bid: {
        type: Number,
        required: [true, 'You must specify a bid'],
        minlength: [20, "min bid you can place is 20"],
        max: [2000, 'Max bid you can place is 2000']
    },

    username: {
        type: String,
        required: [true, 'You must specify your username']
    },

    reputationPoints: {
        type: Number,
        default: 0,
        minlength: [5, 'You can allocate a minimum of 5 reputation points'],
        maxlength: [10, 'You can allocate a maximum of 10 social exchange reputation points to be used']
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;