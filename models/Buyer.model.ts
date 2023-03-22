import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface BuyerDoc extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  image: string;
  address: string;
  confirmationCode: string;
  activated: Boolean;
}

const BuyerSchema: Schema = new mongoose.Schema<BuyerDoc>(
  {
    username: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 20,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[a-zA-Z0-9_-]+$/,
    },
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your first name"],
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
        "Please, enter a valid email",
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
    address: { type: String, required: true },
    confirmationCode: {
      type: String,
      unique: true,
    },
    activated: {
      type: Boolean,
      default: false,
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
    } catch (error: any) {
      throw new Error(error);
    }
  });

const BuyerModel = mongoose.model<BuyerDoc>("Buyer", BuyerSchema);

export default BuyerModel;
