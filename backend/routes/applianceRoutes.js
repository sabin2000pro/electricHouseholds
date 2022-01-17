const express = require('express');
const applianceRouter = express.Router();
const applianceController = require('../controllers/applianceController');

applianceRouter.route('/fetch-appliances').get(applianceController.getAllAppliances);
applianceRouter.route('/create-appliance').post(applianceController.createAppliance);
applianceRouter.route('/edit-appliance/:id').put(applianceController.editAppliance);
applianceRouter.route('/fetch-single-appliance/:id').get(applianceController.getApplianceByID);
applianceRouter.route('/delete-appliances').delete(applianceController.deleteAppliances);
applianceRouter.route('/delete-appliance/:id').delete(applianceController.deleteAppliance);

module.exports = applianceRouter;