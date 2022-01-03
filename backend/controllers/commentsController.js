const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    
    comment: {
        type: String,
        required: [true, 'You must provide a comment']
    },

    createdAt: Date
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;