

/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * Purpose of File: Stores necessary data to create a new Appliance on the system
 * File Type: Model File
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2022 - eHouseholds Sabin Constantin Lungu. All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({ 
    name: { // Name of the appliance
        type: String,
        required: [true, 'You must specify the appliace name you want to create']
    },

    description: { // Appliance description field
        type: String,
        required: [true, 'Please specify a description for your appliance']
    }
    
});

const Appliance = mongoose.model('Appliance', applianceSchema);
module.exports = Appliance; // Export the Appliance model