import express from "express";
import {
  addOrRemoveFromWishlist,
  getProductsByBrand,
  searchProduct,
} from "../controllers/Product.controller";
import { Authenticate, AuthorizeBuyer } from "../middlewares";

const router = express.Router();

router.get("/brand/:brandName", getProductsByBrand);
router.get(
  "/:productId/wishlist",
  Authenticate,
  AuthorizeBuyer,
  addOrRemoveFromWishlist
);
router.get("/search", searchProduct)

export default router;
