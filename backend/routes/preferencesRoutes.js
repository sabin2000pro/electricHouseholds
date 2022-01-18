const express = require('express');
const preferenceRouter = express.Router();
const preferenceController = require('../controllers/preferencesController');
const rateLimit = require('express-rate-limit');

const preferenceRateLimiter = rateLimit({
    
});

preferenceRouter.route('/create-preference').post(preferenceController.createPreference);
preferenceRouter.route('/fetch-preferences').get(preferenceController.fetchAllPreferences);
preferenceRouter.route('/fetch-preferences/:id').get(preferenceController.getPreferenceByID);
preferenceRouter.route('/delete-preferences').delete(preferenceController.deleteAllPreferences);
preferenceRouter.route('/delete-preference/:id').delete(preferenceController.deletePreference);
preferenceRouter.route('/edit-preference/:id').put(preferenceController.editPreference);

module.exports = preferenceRouter; // Exports the Preference Router