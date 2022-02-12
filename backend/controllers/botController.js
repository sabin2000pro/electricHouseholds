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

const Bot = require('../models/botModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;

module.exports.getAllBots = catchAsync(async(request, response, next) => {
    const allBots = await Bot.find();
    return response.status(ok).json({allBots});
});

module.exports.getSingleBot = catchAsync(async(request, response, next) => {

    if(request.method === 'GET') {
        const id = request.params.id;
        const bot = await Bot.findById(id);

        return response.status(ok).json({bot});
    }

    if(!bot) {
        return response.status(notFound).json({status: "Fail", message: 'Bot not found'});
    }

});

module.exports.createBot = catchAsync(async (request, response, next) => {
    const {name, botCredits, type, numberOfBots, creditsLeft} = request.body;

    if(request.method === 'POST') {

        const newBot = new Bot({name, botCredits, type, numberOfBots, creditsLeft});
        await newBot.save();
        return response.status(created).json({newBot});
    }
});

module.exports.editBot = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(request.method === 'PUT') {
       const editedBot = await Bot.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
       await editedBot.save();
    }

});

module.exports.deleteBot = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(request.method === 'DELETE') {

        await Bot.findByIdAndDelete(id);
        return response.status(noContent).json({status: "Success", message: "Bot deleted success"});
    }  

});

module.exports.deleteAllBots = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Bot.deleteMany();
        return response.status(noContent).json("Bots Deleted");
    }
});