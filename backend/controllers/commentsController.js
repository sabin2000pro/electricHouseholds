const Comment = require('../models/commentsModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const notFound = 404;
const created = 201;
const serverError = 500;

module.exports.createComment = catchAsync(async (request, response, next) => {

    if(request.method === 'POST') {
        const {comment, username} = request.body;
        const newComment = await Comment({comment, username});
        await newComment.save();

        return response.status(201).json({newComment});
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
        return response.status(404).json({status: "Fail", message: "Comment not found with that ID"})
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

    }
});

module.exports.deleteComments = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {

        await Comment.deleteMany();

        return response.status(204).json("Comments Deleted");
    }

    
})