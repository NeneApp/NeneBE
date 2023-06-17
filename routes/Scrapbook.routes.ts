import express from "express";
import { Authenticate, AuthorizeAdmin } from "../middlewares";
import {
  addImagesToScrapbook,
  createScrapbook,
  deleteScrapbook,
  removeImageFromScrapbook,
  getScrapbook,
  getScrapbooks,
  updateScrapbook,
} from "../controllers/Scrapbook.controllers";
import { upload } from "../utility/multer";

const router = express.Router();

router.post(
  "/",
  Authenticate,
  AuthorizeAdmin,
  upload.single("image"),
  createScrapbook
);
router.get("/getBooks", Authenticate, getScrapbooks);
router.get("/:scrapbookId", Authenticate, getScrapbook);
router.put(
  "/:scrapbookId/update",
  Authenticate,
  AuthorizeAdmin,
  upload.single("image"),
  updateScrapbook
);
router.delete(
  "/:scrapbookId/delete",
  Authenticate,
  AuthorizeAdmin,
  deleteScrapbook
);
router.put(
  "/:scrapbookId/addImages",
  Authenticate,
  AuthorizeAdmin,
  upload.array("image"),
  addImagesToScrapbook
);
router.delete(
  "/:scrapbookId/removeImage",
  Authenticate,
  AuthorizeAdmin,
  removeImageFromScrapbook
);

export default router;
