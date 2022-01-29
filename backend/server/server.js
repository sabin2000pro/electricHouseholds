const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const cors = require('cors');
const csurf = require('csurf');
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
const botRoutes = require('../routes/botRoutes');

// Middlewares
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(nocache());
app.use(express.json());
connectDB();

// Mount the routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/appliances', applianceRoutes);
app.use('/api/v1/preferences', preferenceRoutes);
app.use('/api/v1/timeslots', timeslotRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/bids', bidRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/bot', botRoutes);

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Create Server to listen for incoming requests
const server = app.listen(port, (err) => {
    try {

        if(!err) { // If no error occurred
            return console.log(`Listening for requests on port ${port} in environment ${process.env.NODE_ENV}`);
        }

        else {
            return console.error(`Could not listen for requests : ${err}`);
        }
    } 
    
    catch(error) { // Catch error if arises

        if(error) {
            return console.error(err);
        }
    }
});

// Handle server crashes
process.on('uncaughtException', (err, promise) => {
    
    if(err) {
        return console.error(err);
    }

    // Close the server by exiting the process
    return server.close(() => {
        return process.exit(1);
    });
})

// Handle 404 Routes
app.all('*', (request, response, next) => {
    if(request.method === 'GET') {
        
        response.status(404).json({status: 'Fail', message: 'The route you requested is not valid'});
        return next();
    }
});

module.exports = server; // Export server as a module to be reused