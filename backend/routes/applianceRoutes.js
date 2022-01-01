const express = require('express');
const applianceRouter = express.Router();
const applianceController = require('../controllers/applianceController');

applianceRouter.route('/fetch-appliances').get(applianceController.getAllAppliances);
applianceRouter.route('/create-appliance').post(applianceController.createAppliance);
applianceRouter.route('/edit-appliance/:id').put(applianceController.editAppliance);
applianceRouter.route('/fetch-single-appliance/:id').get(applianceController.getApplianceByID);
applianceRouter.route('/delete-appliances').delete(applianceController.deleteAppliances);
applianceRouter.route('/delete-single-appliance/:id').delete(applianceController.deleteAppliance);

applianceRouter.route('/sort-appliances').get(applianceController.sortAppliances);
applianceRouter.route('/limit-appliances').get(applianceController.limitAppliances);

module.exports = applianceRouter;