const mongoose = require('mongoose');

const BotSchema = new mongoose.Schema({

});

const Bot = mongoose.Model('Bot', BotSchema);
module.exports = Bot; // Exports the bot model