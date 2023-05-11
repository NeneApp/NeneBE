import express from "express";
import {
  addOrRemoveFromWishlist,
  getProductsByBrand,
  getVendorProducts,
  updateVendorProducts,
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
router.get("/my-products", Authenticate, getVendorProducts);
router.put("/:productId/update", Authenticate, updateVendorProducts);
export default router;
