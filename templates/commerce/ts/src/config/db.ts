import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
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
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
        // Don't exit process, just log error so server can still run
        console.log('💡 Server will continue without database connection');
    }
};

export default connectDB;
