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
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'})
const DB_URL = process.env.MONGO_URL

const connectDB = async () => { // Method to connect to the MongoDB database
    
    try {

        return await mongoose.connect("mongodb+srv://sabin2000:123mini123@cluster0.vsn1te6.mongodb.net/ehouseholds?retryWrites=true&w=majority").then(conn => {
            
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
            return console.error(err);
        }
        
    }
}

module.exports = connectDB; // Export the Connect to Database module