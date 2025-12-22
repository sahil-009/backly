const mongoose = require('mongoose');
const { setDbStatus } = require('../utils/banner');

const connectDB = async () => {
    // Set up connection event listeners
    mongoose.connection.on('connected', () => {
        console.log('✅ MongoDB Connected');
        setDbStatus(true);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('❌ MongoDB Disconnected');
        setDbStatus(false);
    });

    mongoose.connection.on('error', (err) => {
        console.error(`❌ MongoDB Error: ${err.message}`);
        setDbStatus(false);
    });

    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
        console.error('❌ MongoDB URI not configured');
        setDbStatus(false);
        return false;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        // Connection status will be set by the 'connected' event
        return mongoose.connection.readyState === 1;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        setDbStatus(false);
        return false;
    }
};

module.exports = connectDB;
