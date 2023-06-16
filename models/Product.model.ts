import mongoose from "mongoose";
import { productAttribute } from "../dto/Category.dto";

export interface ProductDoc extends Document {
  name: string;
  store_id: string;
  brand: string;
  quantity: number;
  description: string;
  code: string;
  slug: string;
  prize: number;
  body_fit: string;
  size: string;
  colour: string;
  style: string;
  material: string;
  length: string
  neckline: string;
  sleeve_length: string;
  dress_type: string;
  discount: number;
  attribute: productAttribute;
  is_sold: boolean;
  category: string;
  productType: string
}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    store_id: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: [true, "Please enter the product brand"],
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    size: {
      type: String
    },
    colour: {
      type: String
    },
    style: {
      type: String
    },
    material: {
      type: String
    },
    body_fit: {
      type: String
    },
    length: {
      type: String
    },
    neckline: {
      type: String
    },
    sleeve_length: {
      type: String
    },
    dress_type: {
      type: String
    },
    prize: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    //   validate: [
    //     (value: number)  => {
    //         return this.prize >= value;
    //     }, "value must be less than product's prize"
    // ]
    },
    attribute: {
      type: Object,
      default: {},
    },
    is_sold: {
      type: Boolean,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    vendorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    productType: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

const ProductModel = mongoose.model<ProductDoc>("Product", productSchema);

export default ProductModel;