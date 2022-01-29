const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({

    nickname: { // The nickname of the bidding schema
        type: String
    },

    virtualCredits: {
        type: Number,
        default: 50
    },

    openingBid: { // The opening bid field
        type: Number,
        default: 50,
    },

    bid: {
        type: Number,
        minlength: [20, "min bid you can place is 20"],
        max: [2000, 'Max bid you can place is 2000']
    },

    username: {
        type: String
    }

});

const Bid = mongoose.model('Bid', bidSchema);
module.exports = Bid;