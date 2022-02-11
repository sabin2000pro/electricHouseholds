const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    bid: {
        type: Number,
        minlength: [20, "min bid you can place is 20"],
        max: [2000, 'Max bid you can place is 2000']
    },

    nextRoundBid: {
        type: Number
    },

    lastRoundBid: {
        type: Number
    },

    username: {
        type: String
    },

    creditsLeft: {
        type: String
    },

    reputationPoints: {
        type: String,
        default: 0,
        min: [10, 'You can have a minimum of 10 reputation points'],
        max: [100, 'You can have a maximum of 100 reputation points']
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;