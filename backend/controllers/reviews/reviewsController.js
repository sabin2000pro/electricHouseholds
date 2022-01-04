const Review = require('../../models/reviewsModel');
const catchAsync = require('../../utils/catchAsync');
const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.fetchAllReviews = catchAsync(async(request, response, next) => {
    if(request.method === 'GET') {
       const allReviews = await Review.find();
       return response.status(200).json({allReviews});
    }
});

module.exports.fetchReviewByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {

    }
})

module.exports.createReview = catchAsync(async (request, response, next) => {
    const {rating, review, username, reason} = request.body;

    if(!rating || !review || !username || !reason) {
        return response.status(400).json({status: "Fail", message: "Invalid Review Entries"});
    }

    if(request.method === 'POST') {
        const newReview = new Review({rating, review, username, reason});
        await newReview.save();

        return response.status(201).json({newReview});
    }
});

module.exports.editReview = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {

        const updatedReview = await Review.findByIdAndUpdate(id, request.body);
        await updatedReview.save(); // Save the review to the database
    }
});

module.exports.deleteReview = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {

    }
});

module.exports.deleteAllReviews = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {

    }
})