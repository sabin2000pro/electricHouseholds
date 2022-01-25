const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({
    name: {
        type: String
    },

    virtualCredits: {
        type: String
    },

    type: {
        enum: ['Low', 'Medium', 'Intense']
    }

});

const Bot = mongoose.model('Bot', BotSchema);
module.exports = Bot; // Exports the bot model