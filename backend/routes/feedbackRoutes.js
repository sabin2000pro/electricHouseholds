const express = require('express');
const feedbackRouter = express.Router();
const feedbackController = require('../controllers/feedbackController');

feedbackRouter.route('/fetch-feedbacks').get(feedbackController.getAllFeedbacks);
feedbackRouter.route('/create-feedback').post(feedbackController.createFeedback);
feedbackRouter.route('/delete-feedbacks').delete(feedbackController.deleteAllFeedbacks);
feedbackRouter.route('/edit-feedback/:id').put(feedbackController.editFeedback);
feedbackRouter.route('/delete-feedback/:id').delete(feedbackController.deleteFeedback);

module.exports = feedbackRouter;