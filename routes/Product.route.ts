import express from "express";
import {
  addOrRemoveFromWishlist,
  getProductsByBrand,
  getVendorProducts,
  updateVendorProduct,
  getVendorProd,
  deleteVendorProduct
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
router.put("/:productId/update", Authenticate, updateVendorProduct);
router.delete("/:productId/", Authenticate, deleteVendorProduct);
router.get("/getVendorProduct/:vendorSlug", getVendorProd);

export default router;