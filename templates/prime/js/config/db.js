const mongoose = require('mongoose');

const connectDB = async () => {
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
        console.log('⚠️  MongoDB URI not configured');
        console.log('📝 To enable database features:');
        console.log('   1. Copy .env.example to .env');
        console.log('   2. Update MONGODB_URI with your MongoDB connection string');
        console.log('   3. Restart the server');
        console.log('');
        console.log('💡 Server will continue without database connection');
        console.log('');
        return null;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            // These options are no longer needed in Mongoose 6+
            // but keeping them for compatibility
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.log('💡 Server will continue without database connection');
        console.log('');
        return null;
    }
};

module.exports = connectDB;
