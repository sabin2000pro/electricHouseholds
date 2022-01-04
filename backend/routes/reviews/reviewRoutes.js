const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../../controllers/reviews/reviewsController');

reviewRouter.route('/fetch-reviews').get(reviewController.fetchAllReviews);
reviewRouter.route('/fetch-review/:id').get(reviewController.fetchReviewByID);
reviewRouter.route('/create-review').post(reviewController.createReview);
reviewRouter.route('/update-review/:id').put(reviewController.editReview);
reviewRouter.route('/delete-reviews').delete(reviewController.deleteAllReviews);
reviewRouter.route('/delete-review/:id').delete(reviewController.deleteReview);

module.exports = reviewRouter;