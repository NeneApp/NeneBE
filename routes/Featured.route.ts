import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares";
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
  "/", Authenticate, AuthorizeAdmin,
  upload.fields([{ name: "image" }, { name: "video" }]),
  createFeaturedPost
);
router.get("/", Authenticate, getFeaturedPosts);
router.get("/:slug", Authenticate, getFeaturedPost);
router.put(
  "/:slug", Authenticate, AuthorizeAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updateFeaturedPost
);
router.delete("/:slug", Authenticate, AuthorizeAdmin, deleteFeaturedPost);

export default router;
