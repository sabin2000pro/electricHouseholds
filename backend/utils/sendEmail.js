/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 * Code Retrieved from Nodemailer Documentation
 */


const nodemailer = require('nodemailer');

const sendEmail = (options) => { // Function to send e-mail

    const transporter = nodemailer.createTransport({ // Create a transporter that stores the host, port and authorization parameters
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }

    });

    // Mail Options that stores the following properties
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: options.to,
        subject: options.subject,
        html: options.text
    };

   return transporter.sendMail(mailOptions, function(err, info) { // Send the e-mail
      
    })
};

module.exports = sendEmail; // Export function