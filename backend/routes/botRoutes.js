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