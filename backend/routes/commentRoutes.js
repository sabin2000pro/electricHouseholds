const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentsController');

commentRouter.route('/fetch-comments').get(commentController.viewAllComments);
commentRouter.route('/create-comment').post(commentController.createComment);
commentRouter.route('/delete-comments').delete(commentController.deleteComments);
commentRouter.route('/edit-comment/:id').put(commentController.editComment);
commentRouter.route('/delete-comment/:id').delete(commentController.deleteComment);

module.exports = commentRouter;