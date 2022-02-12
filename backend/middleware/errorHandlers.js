

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Establish a Database Connection
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, request, response, next) => { // Error Handler Middlware
    let error = {...err}; // Destructure errors
    err.message = error.message;

    // Check for errors
    if(err.name === 'CastError') {
        
    }

    if(err.code === 11000) {
        
    }

};

module.exports = errorHandler;