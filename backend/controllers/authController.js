const Admin = require('../models/adminModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const notFound = 404;
const serverError = 500;

module.exports.registerAdmin = catchAsync(async (request, response, next ) => {
 return next();
});

module.exports.loginAdmin = catchAsync(async (request, response, next) => {
    return next();
});

module.exports.forgotPassword = catchAsync(async (request, response, next) => {

    return next();
});

module.exports.resetAdminPassword = catchAsync(async (request, response, next) => {
    return next();
})

module.exports.fetchAllAdmins = catchAsync(async (request, response, next) => {

});

