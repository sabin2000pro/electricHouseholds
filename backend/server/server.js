const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const cors = require('cors');
const app = express();
const port = process.env.PORT;
const connectDB = require('../database/db');

// Import the Routes Here
const authRoutes = require('../routes/authRoutes');
const applianceRoutes = require('../routes/applianceRoutes');

// Middlewares
app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
connectDB();

app.use('/api/v1/auth', authRoutes);

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

// Add an app.all() to handle 404 routes

app.all('*', (request, response, next) => {
    response.status(404).json({status: 'Fail', message: 'The route you requested is not valid'});

    return next();
});


module.exports = server; // Export server as a module to be reused