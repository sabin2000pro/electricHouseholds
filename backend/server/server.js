const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');
const xss = require('xss-clean');
const cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(mongoSanitize());
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const server = app.listen(port, (err) => {
    try {
        if(!err) {
            return console.log(`Listening for requests on port ${port}`);
        }

        else {
            return console.error(`Could not listen for requests : ${err}`);
        }
    } 
    
    catch(err) {

        if(err) {
            return console.error(err);
        }
    }
});


module.exports = server;