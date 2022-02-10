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

    finalRoundBid: {
        type: Number
    },

    username: {
        type: String
    },

    creditsLeft: {
        type: String
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;