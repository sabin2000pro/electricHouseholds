const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
    name: {
        type: String
    },

    virtualCredits: {
        type: String,
        default: 0,
        min: [10, 'Bot must have at least £10 in Virtual Credits to Bid'],
        max: [50, 'Bot must have at least £50 in Virtual Credits to Bid']
    },

    type: {
        type: String,
        enum: ['Low', 'Medium', 'Intense']
    }

});

const Bot = mongoose.model('Bot', BotSchema);
module.exports = Bot; // Exports the bot model