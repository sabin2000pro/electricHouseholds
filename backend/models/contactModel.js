const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide your First Name'],
        min: [15, 'First name must not exceed 10 characters'],
        max: [20, 'First name must not exceed 20 characters']
    },

    lastName: {
        type: String,
        required: [true, 'Please provide your last name']
    },

    username: {
        type: String,
        required: [true, 'Please provide the Username you signed up with'],
        min: [10, 'Username must not exceed 10 characters']
    },

    emailAddress: {
        type: String,
        required: [true, 'Please provide the E-mail you signed up with']
    },

    issueType: {
        type: String,
        required: [true, 'Please include what the kind of issue you are encountering'],
        enum: ['Homepage', 'Algorithms', 'Preferences', 'Register', 'Login']
    },

    description: { // Description Field
        type: String,
        required: [true, 'Please provide a description of your problem']
    }
});

const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact; // Export the Contact Schema