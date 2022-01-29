const mongoose = require('mongoose');

const creditSchema = new mongoose.Schema({
    openingBid: {
        type: String,
        required: [true, 'Please specify opening bid']
    },

    virtualCredits: {
        type: String,
        default: 50,
        required: [true, 'Please specify the number of Virtual Credits to allocate to user']
    }
});

const Credit = mongoose.model('Credit', creditSchema);
module.exports = Credit;