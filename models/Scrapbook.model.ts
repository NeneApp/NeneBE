import mongoose, { Schema } from "mongoose";

interface ScrapbookDoc extends Document {
  name: string;
  collections: string[];
  imageURL: string;
  viewCount: number;
}

const ScrapbookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    collections: [],
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const ScrapbookModel = mongoose.model<ScrapbookDoc>(
  "Scrapbook",
  ScrapbookSchema
);

export default ScrapbookModel;
