const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentsController');

commentRouter.route('/fetch-comments').get(commentController.viewAllComments);

module.exports = commentRouter;