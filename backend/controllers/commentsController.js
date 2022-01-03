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
    }


});

module.exports.viewAllComments = catchAsync(async (request, repsonse, next) => {
    if(request.method === 'GET') {
        const allComments = await Comment.find();
    }
    
});

module.exports.viewComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;
});

module.exports.editComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;
});

module.exports.deleteComment = catchAsync(async (request, response, next) => {
    const id = request.params.id;
});

module.exports.deleteComments = catchAsync(async (request, response, next) => {

})