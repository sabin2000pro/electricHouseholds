const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

module.exports = authRouter; // Export router to be used in the server