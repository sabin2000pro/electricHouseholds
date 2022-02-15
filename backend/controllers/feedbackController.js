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

const Feedback = require('../models/feedbackModel');
const catchAsync = require('../utils/catchAsync');
const ErrorResponse = require('../utils/errorResponse');
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;
const failedDependency = 424;
const serverError = 500;

module.exports.getAllFeedbacks = catchAsync(async (request, response, next) => {
    console.log(request.method);

    if(request.method === 'GET') {
        const allFeedbacks = await Feedback.find(); // Find all feedbacks

        if(!allFeedbacks) {
            return next(new ErrorResponse(`No Feedbacks found`, 404));
        }
        
        return response.status(ok).json({allFeedbacks});
    }
   
});

module.exports.viewFeedbackByID = catchAsync(async (request, response, next) => {
    // Check for invalid method

    const id = request.params.id;
    const feedback = await Feedback.findById(id);
    return response.status(ok).json({feedback});
});

module.exports.createFeedback = catchAsync(async (request, response, next) => {
    
    if(request.method === 'POST') {
        const {feedbackUsername, feedbackEmailAddress, feedbackFeeling, feedbackDescription, feedbackReason} = request.body;

        if(!feedbackUsername || !feedbackEmailAddress || !feedbackFeeling || !feedbackDescription) {
            return next(new ErrorResponse(`Invalid Feedback Entries`, 400));
        }

        const newFeedback = new Feedback({feedbackUsername, feedbackEmailAddress, feedbackFeeling, feedbackDescription, feedbackReason});
        await newFeedback.save(); // Save feedback to database
    
        return response.status(created).json({newFeedback});
    }

});

module.exports.editFeedback = catchAsync(async (request, response, next) => {

    if(request.method === 'PUT') {
        const id = request.params.id;
        const body = request.body;

        const updatedFeedback = await Feedback.findByIdAndUpdate(id, body, {new: true, runValidators: true});

        if(!updatedFeedback) {
            return response.status(400).json({success: false, message: "Feedback not found"});
        }

        await updatedFeedback.save();
    }
    
});

module.exports.deleteFeedback = catchAsync(async (request, response, next) => {

    if(request.method !== 'DELETE') {

        const id = request.params.id;

        if(!id) {
            return next(new ErrorResponse(`No feedback found with that ID`, notFound));

        }
    }

});

module.exports.deleteAllFeedbacks = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Feedback.deleteMany();

        return response.status(noContent).json({status: 'success', data: {} });
    }
});