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