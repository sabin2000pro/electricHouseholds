/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const Comment = require('../models/commentsModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const notFound = 404;
const created = 201;
const serverError = 500;

module.exports.createComment = catchAsync(async (request, response, next) => {

    if(request.method === 'POST') {
        const {commentTitle, commentUsername, commentReason, commentDescription} = request.body;
        const newComment = new Comment({commentTitle, commentUsername, commentReason, commentDescription});
        await newComment.save();

        return response.status(created).json({newComment});
    }

});

module.exports.viewAllComments = catchAsync(async (request, response, next) => {
    if(request.method === 'GET') {

        const allComments = await Comment.find();
        return response.status(ok).json({allComments});
    }

});

module.exports.viewComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Comment not found with that ID"})
    }
});

module.exports.editComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "Comment not found with that ID"})
    }

    if(request.method === 'PUT') {
        const updatedComment = await Comment.findByIdAndUpdate(id, request.body);
        await updatedComment.save();

        return response.status(200).json("Comment Updated");
    }
});

module.exports.deleteComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Comment not found with that ID"})
    }

    if(request.method === 'DELETE') {
        await Comment.findByIdAndDelete(id);
        return response.status(204).json("Comment Deleted");
    }
});

module.exports.deleteComments = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {

        await Comment.deleteMany();

        return response.status(204).json("Comments Deleted");
    }
});