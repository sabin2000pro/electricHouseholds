const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    virtualCredits: {
        type: Number
    },

    openingBid: { // The opening bid
        type: Number,
        default: 10
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
        minlength: [5, 'You can allocate a minimum of 5 reputation points'],
        maxlength: [10, 'You can allocate a maximum of 10 social exchange reputation points to be used']
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;