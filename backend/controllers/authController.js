const Admin = require('../models/adminModel');
const catchAsync = require('../utils/catchAsync');
const ok = 200;
const created = 201;
const badRequest = 400;
const unauthorized = 401;
const forbidden = 403;
const notFound = 404;
const serverError = 500;


module.exports.registerAdmin = catchAsync(async (request, response, next ) => { // Exported Register Admin Middleware Function
 const {username, emailAddress, password, confirmPassword} = request.body;

    if(!username || !emailAddress || !password || !confirmPassword) {
        return response.status(badRequest).json({status: 'Fail', message: 'Please check your entries'})
    }

    const newAdmin = new Admin({username, emailAddress, password, confirmPassword});
    await newAdmin.save();

    sendToken(newAdmin, ok, response); // Send the JWT Token

    return next();
});

module.exports.loginAdmin = catchAsync(async (request, response, next) => {
    const {emailAddress, password} = request.body;

    if(!emailAddress || !password) {

    }

    const admin = await Admin.findOne({emailAddress}).select("+password"); // Select an admin by pasword

    if(!admin) {
        
    }

    return next();
});

module.exports.forgotPassword = catchAsync(async (request, response, next) => {
    const {emailAddress} = request.body;
     return next();
});

module.exports.resetAdminPassword = catchAsync(async (request, response, next) => {
    return next();
})

module.exports.fetchAllAdmins = catchAsync(async (request, response, next) => {
     return next();
});

const sendToken = (admin, status, response) => { // Sends back the JWT token
     
}