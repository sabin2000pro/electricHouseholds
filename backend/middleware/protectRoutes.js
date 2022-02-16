

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Protects Back-End Routes with a JWT token
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const Admin = require('../models/adminModel');
const ErrorResponse = require('../utils/errorResponse');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');

module.exports.protect = catchAsync(async (request, response, next) => {
    let token;
    const authHeader = request.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer')) { // if the auth header starts with Bearer ...
        token = authHeader.split(' ')[1]; // Turn it into an array
    }

    if(!token) {
        return next(new ErrorResponse(`Token not found`, 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        request.admin = await Admin.findById(decoded.id);
        return next();
    } 
    
    catch(err) {

        if(err) {
            return next(new ErrorResponse(`Invalid Token.`, 401));
        }
    }
});

// Middleware Function to restrict acess (RBAC) to specific users
module.exports.restrictTo = (...roles) => {
    return (request, response, next) => {
        

        return next();
    }
}