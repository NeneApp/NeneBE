import mongoose from 'mongoose';
import log from '../utility/logger';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    const URI: any = process.env.MONGO_URI as string;
    await mongoose.connect(URI);
  
    log.info(`MongoDB Connected`);
  } catch (error) {
    log.info('There is an error in the database', error);
    process.exit(1);
  }
}; 

export default connectDB;
