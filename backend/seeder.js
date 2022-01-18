const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
// Configure Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const DB_URL = process.env.DB_CONN_URL;
const Admin = require('./models/adminModel');

let errPresent;

// Connect to database
mongoose.connect(DB_URL, {
    
});


const admins = JSON.parse(fs.readFileSync(path.join(`${__dirname}/data/admins.json`), 'utf-8'));


const importData = async () => {
    try {
        // Load JSON file into the DB model
    } 
    
    catch(error) {
        if(error) {
            errPresent = true;
            return console.error(error);
        }
    }
};

const removeData = async () => {
    try {

    } 
    
    catch(error) {
        if(error) {
            errPresent = true;
            return console.error(error);
        }
    }
}


// Command Line Arguments for manipulating data
if(process.argv[2] === '--import') {

};

if(process.argv[2] === '--delete') {

}