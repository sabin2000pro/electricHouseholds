const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'You must provide Admin Username']
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;