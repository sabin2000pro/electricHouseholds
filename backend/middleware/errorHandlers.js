const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, request, response, next) => { // Error Handler Middlware
    let error = {...err};
    error.message = err.message;

    // Check for errors
    if(err.name === 'CastError') {

    }
};

module.exports = errorHandler;