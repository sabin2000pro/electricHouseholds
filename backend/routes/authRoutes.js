const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');

authRouter.route('/register-admin').post(authController.registerAdmin);
authRouter.route('/login-admin').post(authController.loginAdmin);
authRouter.route('/forgot-password').post(authController.forgotPassword);
authRouter.route('/reset-password/:resetToken').put(authController.resetAdminPassword);
authRouter.route('/fetch-admins').get(authController.fetchAllAdmins);

module.exports = authRouter; // Export router to be used in the server