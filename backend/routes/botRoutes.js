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
const botController = require('../controllers/botController');
const botRouter = express.Router();

botRouter.route('/get-bots').get(botController.getAllBots);
botRouter.route('/get-bot/:id').get(botController.getSingleBot);
botRouter.route('/create-bot').post(botController.createBot);
botRouter.route('/edit-bot').put(botController.editBot);
botRouter.route('/delete-bot').delete(botController.deleteBot);
botRouter.route('/delete-bots').delete(botController.deleteAllBots);

module.exports = botRouter;