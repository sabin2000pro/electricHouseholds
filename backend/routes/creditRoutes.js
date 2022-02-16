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
const creditRouter = express.Router();
const creditController = require('../controllers/creditController');

creditRouter.route('/create-credits').post(creditController.createCredits);
creditRouter.route('/get-credits').get(creditController.getAllCredits);
creditRouter.route('/get-credits/:id').get(creditController.getCreditByID);
creditRouter.route('/delete-credits').delete(creditController.deleteCredits);
creditRouter.route('/delete-credits/:id').delete(creditController.deleteCreditByID);
creditRouter.route('/update-credits/:id').put(creditController.updateCredits);

module.exports = creditRouter;