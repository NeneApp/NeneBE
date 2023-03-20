import mongoose, { Schema } from 'mongoose';
export interface IBuyerLogin extends Document {
    username: string;
    email: string;
    password: string;
    token: string; 
}

const userSchema: Schema = new mongoose.Schema<IBuyerLogin>({
  username: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[a-zA-Z0-9_-]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 255,
    trim: true,
    match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
    select: false
  },
  token: {
    type: String, // add token property with type String
    required: true
  }
});

const BuyerModel = mongoose.model<IBuyerLogin>('Buyer', userSchema);

export default BuyerModel;