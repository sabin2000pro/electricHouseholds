const Appliance = require('../models/applianceModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;
const notFound = 404;
const badRequest = 400;

module.exports.getAllAppliances = catchAsync(async (request, response, next) => {
    const appliances = await Appliance.find();
    return response.status(ok).json({appliances}); // Return all the appliances in JSON format
});

module.exports.createAppliance = catchAsync(async (request, response, next) => {
    const {name, description, nextAppliance} = request.body;

    if(request.method === 'POST') {
        const newAppliance = new Appliance({name, description, nextAppliance}); // Create a new Appliance Instance
        await newAppliance.save();
        return response.status(created).json({newAppliance});
    }
    
});

module.exports.getApplianceByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) { // If no ID present
        return response.status(notFound).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    if(request.method === 'GET') {
        const appliance = await Appliance.findById(id);
        return response.status(ok).json({appliance});
    }

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
        
        return response.status(ok).send("Appliance Updated");
    }

});

module.exports.deleteAppliance = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(notFound).json({status: "Fail", message: "No Appliance found with that ID"});
    }

    await Appliance.findByIdAndDelete(id);
    return response.status(noContent).json("Appliance deleted");

});

module.exports.deleteAppliances = catchAsync(async (request, response, next) => {
    if(request.method === 'DELETE') {
        await Appliance.deleteMany();
        return response.status(noContent).json("Appliances deleted");
    }
})
