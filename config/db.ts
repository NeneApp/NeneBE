import mongoose from 'mongoose';
import log from '../utility/logger';

mongoose.set('strictQuery', false);

const connectDB = async () => {
  const URI: any = process.env.MONGO_URI;
  await mongoose.connect(URI);

  log.info(`MongoDB Connected`);
};

export default connectDB;
