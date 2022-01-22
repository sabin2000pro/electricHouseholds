const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ // The Comment Model Schema
    
    title: {
        type: String,
        required: [true, 'You must provide a comment']
    },

    username: {
        type: String,
        required: [true, 'Please specify username']
    },

    reason: {
        type: String,
        required: [true, 'Please describe the reason']
    },

    description: {
        type: String,
        required: [true, 'Please provide comment description']
    },

    createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;