const express = require('express');
const rateLimit = require('express-rate-limit');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/protectRoutes');

authRouter.route('/register-admin').post(authController.registerAdmin);
authRouter.route('/login-admin').post(authController.loginAdmin);
authRouter.route('/forgot-password').post(authController.forgotPassword);
authRouter.route('/admin/reset-password/:resetToken').put(authController.resetAdminPassword);
authRouter.route('/fetch-admins').get(authController.fetchAllAdmins);
authRouter.route('/me').get(authMiddleware.protect, authController.getMe);
authRouter.route('/delete-admins').delete(authController.deleteAllAdmins);

module.exports = authRouter; // Export router to be used in the server