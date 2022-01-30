const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    openingBid: {
        type: String
    },

    virtualCredits: {
        type: String,
        default: 50
    },

    creditsLeft: {
        type: String
    }
});

const Credit = mongoose.model('Credit', creditSchema);
module.exports = Credit;