const express = require('express');
const applianceRouter = express.Router();
const applianceController = require('../controllers/applianceController');
const rateLimit = require('express-rate-limit');

const applianceLimiter = rateLimit({
    windowMs: 40 * 40 * 1000,
    max: 10,
    message: "Too many appliance requests coming from this IP address. Try again after 30 minutes. Only 10 per 30 minutes"
});

applianceRouter.route('/fetch-appliances').get(applianceLimiter, applianceController.getAllAppliances);
applianceRouter.route('/create-appliance').post(applianceLimiter, applianceController.createAppliance);
applianceRouter.route('/edit-appliance/:id').put(applianceLimiter, applianceController.editAppliance);
applianceRouter.route('/fetch-single-appliance/:id').get(applianceLimiter, applianceController.getApplianceByID);
applianceRouter.route('/delete-appliances').delete(applianceLimiter, applianceController.deleteAppliances);
applianceRouter.route('/delete-appliance/:id').delete(applianceLimiter, applianceController.deleteAppliance);

module.exports = applianceRouter; // Export the appliance router