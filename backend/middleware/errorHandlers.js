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