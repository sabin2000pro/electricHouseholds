const Admin = require('../models/adminModel');
const catchAsync = require('../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
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

    sendToken(newAdmin, created, response); // Send the JWT Token
});

module.exports.loginAdmin = catchAsync(async (request, response, next) => { // Controller Function to Login Admin
    const {emailAddress, password} = request.body;

    if(!emailAddress || !password) { // If no email or password is specified
        return response.status(unauthorized).json({status: 'Fail', message: 'Please provide e-mail and password before logging in'});
    }

    const admin = await Admin.findOne({emailAddress}).select("+password"); // Select an admin by pasword

    if(!admin) {
        return response.status(notFound).json({status: 'Failed reading admin', message: 'Could not find that admin'});
    }

    // Compare passwords before logging in
    const passwordsMatch = await admin.compareLoginPasswords(password);

    if(!passwordsMatch) {
        return response.status(unauthorized).json({status: 'Failed reading admin', message: 'PAsswords do not match!'});
    }

    return sendToken(admin, ok, response);

});

module.exports.forgotPassword = catchAsync(async (request, response, next) => {
    const {emailAddress} = request.body;
    const admin = await Admin.findOne({emailAddress});

    if(!admin) {
        return response.status(notFound).json({status: "Fail", message: "No admin found with that e-mail address"});
    }

    const resetToken = admin.getResetPasswordToken(); // Get the password reset token
    const resetPasswordURL = `http://localhost:5370/${resetToken}`;
    await admin.save();

    const resetMessage = `<h1> You have requested a new password reset</h1>
            <p> Please go to this link to reset your password </p>
            <a href = ${resetPasswordURL} clicktracking = off>${resetPasswordURL}</a>`

    
    // Send e-mail
    await sendEmail({to: admin.emailAddress, subject: 'Password Reset Request', text: resetMessage});
    return response.status(ok).json({success: true, data: "E-mail sent"});

});

module.exports.resetAdminPassword = catchAsync(async (request, response, next) => {
    const resetToken = request.params.resetToken; // Extract the reset token
    const password = request.body.password; // Get the new password from the body
    
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest('hex'); // Create reset password token

    const admin = await Admin.findOne({passwordResetToken, passwordResetExpires: {$gt: Date.now()}});

        if(!admin) {
            throw new Error('No Admin Found with that E-mail Address');
        }

        admin.password = password; // Update the password by setting the admin password to the new password
        admin.passwordResetToken = undefined; // Set the reset token to undefined
        admin.passwordResetExpires = undefined;

        await admin.save(); 
        return response.status(created).json({success: true, data: "Password Reset Success"});

})

module.exports.fetchAllAdmins = catchAsync(async (request, response, next) => {
    
    if(request.method === 'GET') {
        const allAdmins = await Admin.find();

        return response.status(ok).json(allAdmins);
    }
});

module.exports.deleteAdminAccount = catchAsync(async (request, response, next) => {
    const id = request.params.id;

    if(!id) {
        return response.status(404).json({status: "Fail", message: "Admin with that ID not found"})
    }

    await Admin.findByIdAndDelete(id);
    return response.status(204).json("Admin Account Deleted");

});

const sendToken = (admin, status, response) => { // Sends back the JWT token
     const token = admin.generateResetPasswordToken();

     return response.status(status).json({token});
}