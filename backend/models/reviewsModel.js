const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    rating: {
        type: String,
        required: [true, 'Please submit your rating from 1-10'],
        min: 1,
        max: 10
    },

    review: {
        type: String,
        required: [true, 'Please submit your review text']
    },

    username: {
        type: String,
        required: [true, 'Please provide your Username']
    },

    reason: {
        type: String,
        required: [true, "Please provide the reason for this review"]
    }
});

const Review = mongoose.Model('Review', reviewSchema);
module.exports = Review;