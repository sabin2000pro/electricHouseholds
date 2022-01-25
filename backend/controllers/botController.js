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
        return response.status(404).json({status: "Fail", message: "Could not create bot. Invalid entries"});
    };

    const newBot = new Bot({name, virtualCredits, type});
    await newBot.save();

    return response.status(created).json({newBot});

});

module.exports.editBot = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(request.method === 'PUT') {
       const editedBot = await Bot.findByIdAndUpdate(id, request.body, {new: true, runValidators: true});
    }
});

module.exports.deleteBot = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {

    }
});

module.exports.deleteAllBots = catchAsync(async (request, response, next) => {

});