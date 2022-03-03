const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({

    name: {
        type: String
    },

    botCredits: {
        type: Number,
        default: 50
    },

    type: {
        type: String,
        enum: ['Low', 'Medium', 'Intense']
    },

    numberOfBots: { // The number of bots the user decides to choose
        type: String,
        default: 0
    },

    roundNumnber: {
        type: Number,
        default: 1,
        max: [3, 'There can only be a max of 3 rounds']
    }
});

const Bot = mongoose.model('Bot', BotSchema);
module.exports = Bot; // Exports the bot model