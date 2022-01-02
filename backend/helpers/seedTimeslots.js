const mongoose = require('mongoose');

const fs = require('fs');

// Connect to the database
// Create Function to seed the data from file to DB

const connectDB = async () => {

}

const importTimeslots = async () => {
    try {

    } 
    
    catch(err) {

    }
};

const deleteTimeslots = async () => {
    try {

    } 
    
    catch(err) {

    }
}


if(process.argv[2] === 'import--timeslots') {
    return importTimeslots();
}

if(process.argv[2] === 'remove--timeslots') {
    return deleteTimeslots();
}