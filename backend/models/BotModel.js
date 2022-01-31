const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({

    name: {
        type: String
    },

    botCredits: {
        type: String,
        default: 0
    },

    type: {
        type: String,
        enum: ['Low', 'Medium', 'Intense']
    },

    bidRange: {
        type: String,
        enum: ["0-10", "15-20", "30-50"]
    }

});

const Bot = mongoose.model('Bot', BotSchema);
module.exports = Bot; // Exports the bot model