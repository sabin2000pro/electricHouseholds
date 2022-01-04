const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({ // The Comment Model Schema
    
    comment: {
        type: String,
        required: [true, 'You must provide a comment']
    },

    username: {
        type: String,
        required: [true, 'Please specify username']
    },

    createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;