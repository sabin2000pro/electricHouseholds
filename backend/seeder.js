const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
// Configure Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const DB_URL = process.env.DB_CONN_URL;
const Admin = require('./models/adminModel');
const Appliance = require('./models/applianceModel');

let errPresent;

// Connect to database
mongoose.connect(DB_URL, {
    
});

const admins = JSON.parse(fs.readFileSync(path.join(`${__dirname}/data/admins.json`), 'utf-8'));
const appliances = JSON.parse(fs.readFileSync(path.join(`${__dirname}/data/appliances.json`)));

const importData = async () => {
    try {
        // Load JSON file into the DB model
        await Admin.create(admins);
        await Appliance.create(appliances);
        console.log(`Data imported to DB success`);
        return process.exit();
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

        await Admin.remove();
        await Appliance.remove();
        console.log(`Data removed success`);
        process.exit(1);

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
    return importData();
};

// Command Line Arguments for Removing Data with --delete flag
if(process.argv[2] === '--delete') {
    return removeData();
}