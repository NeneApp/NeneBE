import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface BuyerDoc extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  image: string;
  address: string;
  gender: string;
  confirmationCode: string;
  status: string;
}

const BuyerSchema: Schema = new mongoose.Schema<BuyerDoc>(
  {
    firstName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please enter your first name'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please, enter a valid email',
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 255,
      trim: true,
      match: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/,
      select: false,
    },
    image: {
      type: String,
    },
    address: { type: String },
    gender: {
      type: String,
      enums: ['m', 'f', 'others'],
    },
    confirmationCode: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Active'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password with bcrypt
BuyerSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    // this.confirmationCode = await bcrypt.hash(
    //   this.password,
    //   process.env.HASH_SALT || 10
    // );
  } catch (error: any) {
    throw new Error(error);
  }
});

const BuyerModel = mongoose.model<BuyerDoc>('Buyer', BuyerSchema);

export default BuyerModel;
