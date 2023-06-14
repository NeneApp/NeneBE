import mongoose from "mongoose";

interface FeaturedDoc extends Document {
  title: string;
  description: string;
  bodyOfPost: string;
  imageURL: string;
  videoURL: string;
  slug: string;
  viewCount: number;
}

const FeaturedSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    bodyOfPost: {
      type: String,
    },
    imageURL: {
      type: String,
    },
    videoURL: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
      rewuired: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const FeaturedModel = mongoose.model<FeaturedDoc>("Featured", FeaturedSchema);

export default FeaturedModel;
