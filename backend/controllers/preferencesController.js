const Preference = require('../models/preferencesModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const noContent = 204;
const badRequest = 400;
const notFound = 404;
const serverError = 500;

module.exports.createPreference = catchAsync(async (request, response, next) => {
    const {username, earlyMorningslot, lateMorningslot, afternoonSlot, eveningSlot, appliance, image} = request.body;

    if(!username || !earlyMorningslot || !lateMorningslot || !afternoonSlot || !eveningSlot || !appliance || !image) {
        return response.status(badRequest).json({status: "Fail", message: "Please check your entries again"});
    }

    if(request.method === 'POST') { // If there is a POST request -> create the preference
        const newPreference = new Preference({username, earlyMorningslot, lateMorningslot, afternoonSlot, eveningSlot, appliance, image});
        await newPreference.save();
        
        return response.status(ok).json({newPreference});
    }

});

module.exports.getPreferenceByID = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Preference with that ID not found"});
    }

    const preference = await Preference.findById(id);
    return response.status(ok).json({preference});
});

module.exports.fetchAllPreferences = catchAsync(async (request, response, next) => {

    if(request.method === 'GET') {
        const allPreferences = await Preference.find();
        return response.status(200).json({allPreferences});
    }

});

module.exports.editPreference = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Could not find the preference with that ID"});
    }

    if(request.method == 'PUT') {
        const updatedPreference = await Preference.findByIdAndUpdate(id, request.body);
        await updatedPreference.save();

        return response.status(200).json({updatedPreference});

    }
});

module.exports.deletePreference = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Could not find the preference with that ID"});
    }

    if(request.method === 'DELETE') {
        await Preference.findByIdAndDelete(id);
        return response.status(204).json("Preference Deleted");
    }

});

module.exports.deleteAllPreferences = catchAsync(async(request, response, next) => {
    if(request.method === 'DELETE') {

        await Preference.deleteMany();
        return response.status(204).json("Preferences Deleted");
    }
})

module.exports.sortPreferences = catchAsync(async (request, response, next) => {
  
    const allPreferences = await sort;
    return response.status(200).json({allPreferences});
});