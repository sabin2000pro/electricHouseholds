const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {

    },

    lastName: {

    },

    username: {

    },

    emailAddress: {

    },

    issueType: {

    },

    description: {

    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;