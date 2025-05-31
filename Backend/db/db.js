const mongoose = require('mongoose' );

function connectToDb() {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection URL:', process.env.DB_CONNECT);
    
    mongoose.connect(process.env.DB_CONNECT)
        .then(() => {
            console.log('Successfully connected to MongoDB');
            console.log('Database name:', mongoose.connection.db.databaseName);
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}

module.exports = connectToDb;
