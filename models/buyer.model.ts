import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs"

export interface IBuyerLogin extends Document {
    id?: string;
    username: string;
    email: string;
    password: string;
    status: string;
    token?: string;
    code: Number;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(buyerPassword: string): Promise<boolean>
}

const buyerSchema: Schema = new mongoose.Schema<IBuyerLogin>({
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
  code: {type: Number, },
  token: {
    type: String,
    required: true
  }
  ,
  status: {
    type: String,
    enum: ["pending", "active"],
    default: "active"
  },
  },
  { timestamps: true }
);

buyerSchema.pre("save", async function (next) {

  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // Random additional data
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(this.password, salt);

  // Replace the password with the hash
  this.password = hash;

  return next();
});

// Used for logging in
buyerSchema.methods.comparePassword = async function ( buyerPassword: string) {

  return bcrypt.compare(buyerPassword, this.password).catch((e) => false);
};

const BuyerModel = mongoose.model<IBuyerLogin>("Buyer", buyerSchema);

export default BuyerModel;