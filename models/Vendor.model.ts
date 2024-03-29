import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface VendorDoc extends Document {
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  password: string;
  phone: string;
  image: string;
  address: string;
  slug: string;
  confirmationCode: string;
  status: string;
  role: string;
  //   products
}

const VendorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minLenght: [8, "Password must be at least 6 characters"],
    },
    businessName: {
      type: String,
      required: [true, "Please enter your business name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a vaild email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    image: {
      type: String,
    },
    address: { type: String, required: true },
    slug: String,
    confirmationCode: {
      type: String,
      unique: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Active"],
      default: "Pending",
    },
    role: {
      type: String,
      default: "Vendor",
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

// create slug from business name
// VendorSchema.pre('save', function (next) {
//   this.slug = slugify(this.businessName, { lower: true });
// });

// Encrypt password with bcrypt
VendorSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
  } catch (error: any) {
    throw new Error(error);
  }
});

const VendorModel = mongoose.model<VendorDoc>("Vendor", VendorSchema);

export default VendorModel;
