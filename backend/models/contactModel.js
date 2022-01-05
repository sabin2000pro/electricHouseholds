const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your First Name']
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },

    username: {
        type: String,
        required: [true, 'Please provide the Username you signed up with']
    },

    emailAddress: {
        type: String,
        required: [true, 'Please provide the E-mail you signed up with']
    },

    issueType: {

    },

    description: {

    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;