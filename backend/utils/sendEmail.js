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