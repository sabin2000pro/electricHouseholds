const express = require('express');
const rateLimit = require('express-rate-limit');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/protectRoutes');

const mainAuthLimiter = rateLimit({ // Rate limit middleware to prevent request spamming. RETURNS 429 Too many requests status code
    windowMs: 60 * 60 * 1000, // Every 1 hour
	max: 5, // Limit each IP to 3 reset password requests per `window` (here, per 1 hour)
	message: 'Too many AUTH requests coming from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


authRouter.route('/register-admin').post(mainAuthLimiter, authController.registerAdmin);
authRouter.route('/login-admin').post(mainAuthLimiter, authController.loginAdmin);
authRouter.route('/forgot-password').post(mainAuthLimiter, authController.forgotPassword);
authRouter.route('/admin/reset-password/:resetToken').put(mainAuthLimiter, authController.resetAdminPassword);
authRouter.route('/fetch-admins').get(authController.fetchAllAdmins);
authRouter.route('/me').get(authMiddleware.protect, authController.getMe);

module.exports = authRouter; // Export router to be used in the server