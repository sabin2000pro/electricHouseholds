

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Establish a Database Connection
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const mongoose = require('mongoose');
const Timeslots = require('../models/timeslotsModel');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const DB_CONN_URL = process.env.DB_CONN_URL;

const fs = require('fs');

// Connect to the database
// Create Function to seed the data from file to DB

const connectDB = async () => { // Method to connect to the MongoDB database
    try {
        return await mongoose.connect(DB_CONN_URL).then(conn => {
            if(conn.connection) {

                return console.log(`Connected to DB success`);
            }

            else {
                console.log('Could not connect to DB. Check your connection URL');
            }
        })
    } 
    
    catch(err) {

        if(err) {
            return console.log(err);
        }
    }
}

connectDB();

/**
 * 
 * @returns : null
 * @method: importTimeslots()
 * @description: Imports all the available timeslots to the database
 * @param: null
 * @type: Asynchronous Invoked Routine
 * @author: Sabin Constantin Lungu
 */

const importTimeslots = async () => {
    try {
        // Read JSON file
        const timeslots = JSON.parse(fs.readFileSync(`/Users/sabin2000/Desktop/eHouseholds/backend/data/timeslots.json`));

        for(const data of timeslots) {
            await Timeslots.create(data);
            process.exit(1);
        }
        
    } 
    
    catch(err) {
        if(err) {
            console.log(err);
        }
    }
};

const deleteTimeslots = async () => {
    try {
        await Timeslots.deleteMany();
        console.log(`Data removed`);
        process.exit(1);
    } 
    
    catch(err) {

        if(err) {

            return console.log(err);
        }

    }  
}


if(process.argv[2] === '--import') {
    return importTimeslots();
}

if(process.argv[2] === '--remove') {
    return deleteTimeslots();
}