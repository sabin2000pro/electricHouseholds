const Appliance = require('../models/applianceModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const deleted = 204;
const notFound = 404;
const badRequest = 400;
const serverError = 500;

module.exports.getAllAppliances = catchAsync(async (request, response, next) => {
    let query;

    let queryStr = JSON.stringify(request.query);

    const allAppliances = await Appliance.find();
    return response.status(ok).json({allAppliances}); // Return all the appliances in JSON format

});

module.exports.createAppliance = catchAsync(async (request, response, next) => {
    const {name, image, description} = request.body;

    const newAppliance = new Appliance({name, image, description}); // Create a new Appliance Instance
    await newAppliance.save();

    return response.status(201).json({newAppliance});
});

module.exports.getApplianceByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) { // If no ID present
        return response.status(404).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    const appliance = await Appliance.findById(id);
    return response.status(200).json({appliance});

});

module.exports.editAppliance = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    const updatedAppliance = await Appliance.findByIdAndUpdate(id, request.body);
    await updatedAppliance.save();
    return response.status(200).json("Appliance Updated");

});

module.exports.deleteAppliance = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    return response.status(204).json("Appliance deleted");

});

module.exports.deleteAppliances = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Appliance.deleteMany();
        return response.status(204).json("Appliances deleted");
    }
})
