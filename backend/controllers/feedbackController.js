const Feedback = require('../models/feedbackModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;
const serverError = 500;

module.exports.getAllFeedbacks = catchAsync(async (request, response, next) => {
    const allFeedbacks = await Feedback.find();
    return response.status(200).json({allFeedbacks});
});

module.exports.viewFeedbackByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;
    const feedback = await Feedback.findById(id);
    return response.status(200).json({feedback});
});

module.exports.createFeedback = catchAsync(async (request, response, next) => {
    const {feedbackUsername, feedbackEmailAddress, feedbackFeeling, feedbackDescription} = request.body;
    
    if(!feedbackUsername || !feedbackEmailAddress || !feedbackFeeling || !feedbackDescription) {
        return response.status(400).json({success: false, message: 'Invalid Feedback Entries'});
    }

    const newFeedback = new Feedback({feedbackUsername, feedbackEmailAddress, feedbackFeeling, feedbackDescription});
    await newFeedback.save();

    return response.status(201).json({newFeedback});
});

module.exports.editFeedback = catchAsync(async (request, response, next) => {
    const id = request.params.id;
    
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});

    if(!updatedFeedback) {
        return response.status(400).json({success: false, message: "Feedback not found"});
    }

    await updatedFeedback.save();
});

module.exports.deleteFeedback = catchAsync(async (request, response, next) => {

});

module.exports.deleteAllFeedbacks = catchAsync(async (request, response, next) => {

});