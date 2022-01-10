
const Admin = require('../models/adminModel');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

module.exports.protect = (request, response, next) => {
    let token;
    const authHeader = request.headers.authorization;

    if(authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // Turn it into an array
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
};

module.exports.restrictTo = (...roles) => {

}