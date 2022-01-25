const Bot = require('../models/botModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;

module.exports.getAllBots = catchAsync(async(request, response, next) => {
    const allBots = await Bot.find();
    return response.status(200).json({allBots});
});

module.exports.getSingleBot = catchAsync(async(request, response, next) => {
    const id = request.params.id;
    const bot = await Bot.findById(id);

    if(!bot) {
        return response.status(404).json({status: "Fail", message: 'Bot not found'});
    }

    return response.status(200).json({bot});
});

module.exports.createBot = catchAsync(async (request, response, next) => {
    const {name, virtualCredits, type} = request.body;

    if(!name || !virtualCredits || !type) {

    };

    
});

module.exports.editBot = catchAsync(async (request, response, next) => {

});

module.exports.deleteBot = catchAsync(async (request, response, next) => {
    
});