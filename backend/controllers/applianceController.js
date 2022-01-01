const Appliance = require('../models/applianceModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const deleted = 204;
const notFound = 404;
const badRequest = 400;
const serverError = 500;

module.exports.getAllAppliances = catchAsync(async (request, response, next) => {
    const allAppliances = await Appliance.find();
    const lengthAppliances = allAppliances.length;

    return response.status(ok).json({allAppliances}); // Return all the appliances in JSON format
});

module.exports.createAppliance = catchAsync(async (request, response, next) => {

});

module.exports.getApplianceByID = catchAsync(async (request, response, next) => {

});

module.exports.editAppliance = catchAsync(async (request, response, next) => {

});

module.exports.deleteAppliance = catchAsync(async (request, response, next) => {

});