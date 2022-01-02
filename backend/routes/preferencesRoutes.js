const express = require('express');
const preferenceRouter = express.Router();
const preferenceController = require('../controllers/preferencesController');

preferenceRouter.route('/create-preference')

module.exports = preferenceRouter;