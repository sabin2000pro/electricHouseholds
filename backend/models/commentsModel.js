const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ // The Comment Model Schema
    
    commentTitle: {
        type: String,
        required: [true, 'You must provide a comment']
    },

    commentUsername: {
        type: String,
        required: [true, 'Please specify username']
    },

    commentReason: {
        type: String,
        required: [true, 'Please describe the reason']
    },

    commentDescription: {
        type: String,
        required: [true, 'Please provide comment description']
    },

    createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;