import mongoose from "mongoose";

interface CategoryDoc extends Document {
  name: string;
  subCategory: [];
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subCategory: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model<CategoryDoc>("Category", categorySchema);

export default CategoryModel;
