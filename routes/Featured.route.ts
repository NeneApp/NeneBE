import express from "express";
import { Authenticate, AuthorizeVendor } from "../middlewares";
import {
  createFeaturedPost,
  deleteFeaturedPost,
  getFeaturedPost,
  getFeaturedPosts,
  updateFeaturedPost,
} from "../controllers/Featured.controller";
import { upload } from "../utility/multer";

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "image" }, { name: "video" }]),
  createFeaturedPost
);
router.get("/", getFeaturedPosts);
router.get("/:slug", getFeaturedPost);
router.put(
  "/:slug",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateFeaturedPost
);
router.delete("/:slug", deleteFeaturedPost);

export default router;
