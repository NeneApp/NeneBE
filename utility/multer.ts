import multer from "multer";
import {
  allowedImageExtensions,
  allowedVideoExtensions,
} from "../dto/Featured.dto";
import { extname } from "path";

// Multer storage configuration
// const storage = multer.memoryStorage();
export const upload = multer({
  dest: "./public/data/uploads/",
  fileFilter: (req, file, callback) => {
    // Get the file extension
    const fileExtension = extname(file.originalname).toLowerCase();

    // Check if the file extension matches the allowed image or video extensions
    if (
      allowedImageExtensions.includes(fileExtension) ||
      allowedVideoExtensions.includes(fileExtension)
    ) {
      // Allow the file
      callback(null, true);
    } else {
      // Reject the file
      callback(new Error("Invalid file extension"));
    }
  },
});
