const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const cors = require('cors');
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true })
const cookieParser = require('cookie-parser');
const nocache = require('nocache');
const app = express();
const port = process.env.PORT;
const connectDB = require('../database/db');

// Import the Routes Here
const authRoutes = require('../routes/authRoutes');
const bidRoutes = require('../routes/bidsRoutes');
const applianceRoutes = require('../routes/applianceRoutes');
const preferenceRoutes = require('../routes/preferencesRoutes');
const timeslotRoutes = require('../routes/timeslotsRoutes');
const commentRoutes = require('../routes/commentRoutes');
const reviewRoutes = require('../routes/reviews/reviewRoutes');
const contactRoutes = require('../routes/contactRoutes');
const feedbackRoutes = require('../routes/feedbackRoutes');


// Middlewares
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(nocache());
app.use(express.json());
connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appliances', applianceRoutes);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/timeslots', timeslotRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/bids', bidRoutes);
app.use('/api/v1/feedback', feedbackRoutes);

const server = app.listen(port, (err) => { // Creates a server
    try {

        if(!err) { // If no error occurred
            return console.log(`Listening for requests on port ${port}`);
        }

        else {
            return console.error(`Could not listen for requests : ${err}`);
        }
    } 
    
    catch(err) { // Catch error if arises

        if(err) {
            return console.error(err);
        }
    }
});

process.on('uncaughtException', (err, promise) => {
    console.log(err);

    server.close(() => {
        return process.exit(1);
    });
})

// Add an app.all() to handle 404 routes
app.all('*', (request, response, next) => {
    response.status(404).json({status: 'Fail', message: 'The route you requested is not valid'});
    res.cookie('XSRF-TOKEN', req.csrfToken())
    return next();
});


module.exports = server; // Export server as a module to be reused