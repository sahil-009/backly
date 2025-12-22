import mongoose from 'mongoose';
import { setDbStatus } from '../utils/banner';

const connectDB = async (): Promise<boolean> => {
  if (!process.env.MONGODB_URI) {
    setDbStatus(false);
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    setDbStatus(true);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${(error as Error).message}`);
    setDbStatus(false);
    return false;
  }
};

export default connectDB;
