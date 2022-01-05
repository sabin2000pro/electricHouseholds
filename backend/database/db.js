const mongoose = require('mongoose');
const DB_CONN_URL = process.env.DB_CONN_URL;

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

module.exports = connectDB; // Export the Connect to Database module