/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


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