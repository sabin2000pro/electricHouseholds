const mongoose = require('mongoose');
// Configure Environment Variables
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const DB_URL = process.env.DB_CONN_URL;

// Connect to database
mongoose.connect(DB_URL, {
    
})






// Command Line Arguments for manipulating data
if(process.argv[2] === '--import') {

};

if(process.argv[2] === '--delete') {
    
}