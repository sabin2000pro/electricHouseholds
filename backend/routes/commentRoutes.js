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
const commentRouter = express.Router();
const commentController = require('../controllers/commentsController');

commentRouter.route('/fetch-comments').get(commentController.viewAllComments);
commentRouter.route('/create-comment').post(commentController.createComment);
commentRouter.route('/delete-comments').delete(commentController.deleteComments);
commentRouter.route('/edit-comment/:id').put(commentController.editComment);
commentRouter.route('/delete-comment/:id').delete(commentController.deleteComment);

module.exports = commentRouter;
// Adding heroku to frontend
