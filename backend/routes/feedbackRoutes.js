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
const feedbackRouter = express.Router();
const feedbackController = require('../controllers/feedbackController');

feedbackRouter.route('/fetch-feedbacks').get(feedbackController.getAllFeedbacks);
feedbackRouter.route('/create-feedback').post(feedbackController.createFeedback);
feedbackRouter.route('/delete-feedbacks').delete(feedbackController.deleteAllFeedbacks);
feedbackRouter.route('/edit-feedback/:id').put(feedbackController.editFeedback);
feedbackRouter.route('/delete-feedback/:id').delete(feedbackController.deleteFeedback);

module.exports = feedbackRouter;