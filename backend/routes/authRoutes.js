const express = require('express');
const rateLimit = require('express-rate-limit');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/protectRoutes');

const resetPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // Every 1 hour
	max: 3, // Limit each IP to 3 reset password requests per `window` (here, per 1 hour)
	message: 'Too many reset password requests coming from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const registerAccountLimiter = rateLimit({
    windowMs: 40 * 40 * 1000,
    max: 3,
    message: "Too many register account requests coming from this IP address. Try again after 30 minutes. Only 3 per 30 minutes"
})

authRouter.route('/register-admin').post(registerAccountLimiter, authController.registerAdmin);
authRouter.route('/login-admin').post(authController.loginAdmin);
authRouter.route('/forgot-password').post(authController.forgotPassword);
authRouter.route('/admin/reset-password/:resetToken').put(resetPasswordLimiter, authController.resetAdminPassword);
authRouter.route('/fetch-admins').get(authController.fetchAllAdmins);
authRouter.route('/me').get(authMiddleware.protect, authController.getMe);

module.exports = authRouter; // Export router to be used in the server