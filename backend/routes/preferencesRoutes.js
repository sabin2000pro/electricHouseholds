const express = require('express');
const preferenceRouter = express.Router();
const preferenceController = require('../controllers/preferencesController');

preferenceRouter.route('/create-preference').post(preferenceController.createPreference);
preferenceRouter.route('/fetch-preferences').get(preferenceController.fetchAllPreferences);
preferenceRouter.route('/fetch-preferences/:id').get(preferenceController.getPreferenceByID);

module.exports = preferenceRouter;