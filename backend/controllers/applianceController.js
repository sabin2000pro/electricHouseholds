const Appliance = require('../models/applianceModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const deleted = 204;
const notFound = 404;
const badRequest = 400;
const serverError = 500;

module.exports.getAllAppliances = catchAsync(async (request, response, next) => {

    const appliances = await Appliance.find();
    return response.status(ok).json({appliances}); // Return all the appliances in JSON format
});

module.exports.createAppliance = catchAsync(async (request, response, next) => {
    const {name, description} = request.body;

    const newAppliance = new Appliance({name, description}); // Create a new Appliance Instance
    await newAppliance.save();

    return response.status(created).json({newAppliance});
});

module.exports.getApplianceByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) { // If no ID present
        return response.status(notFound).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    const appliance = await Appliance.findById(id);
    return response.status(ok).json({appliance});

});

module.exports.editAppliance = catchAsync(async (request, response, next) => {
    const newDescription = request.body.newDescription;
    const id = request.body.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    if(request.method === 'PUT') {
        await Appliance.findById(id, (error, updatedAppliance) => {
            updatedAppliance.description = newDescription;
            updatedAppliance.save();
        }).clone().catch(err => {console.log(err)});
        
        return response.status(200).send("Appliance Updated");
    }

});

module.exports.deleteAppliance = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    await Appliance.findByIdAndDelete(id);

    return response.status(noContent).json("Appliance deleted");

});

module.exports.deleteAppliances = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Appliance.deleteMany();
        return response.status(204).json("Appliances deleted");
    }
})
