/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


const express = require('express');
const applianceRouter = express.Router();
const applianceController = require('../controllers/applianceController');

applianceRouter.route('/fetch-appliances').get(applianceController.getAllAppliances);
applianceRouter.route('/create-appliance').post(applianceController.createAppliance);
applianceRouter.route('/edit-appliance/:id').put(applianceController.editAppliance);
applianceRouter.route('/fetch-single-appliance/:id').get(applianceController.getApplianceByID);
applianceRouter.route('/delete-appliances').delete(applianceController.deleteAppliances);
applianceRouter.route('/delete-appliance/:id').delete(applianceController.deleteAppliance);

module.exports = applianceRouter; // Export the appliance router