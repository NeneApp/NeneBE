import config from "../config/environment";
import {
  createBuyer,
  createBuyerBody,
  forgotPasswordBuyer,
  resetpasswordBuyer,
  loginBuyer,
  resendVerifyBuyerMail,
  updateBuyer,
  verifyBuyerMail,
  addToCart,
  checkOut,
} from "./Buyer.docs";
import {
  createVendor,
  createVendorBody,
  forgotPasswordVendor,
  resetpasswordVendor,
  loginVendor,
  resendVerifyVendorMail,
  updateVendor,
  verifyVendorMail,
} from "./Vendor.docs";

import {
  getAllCategories,
  getAllProductsInCategory,
  createCategoryBody,
  addCategory,
  addSubCategory,
  createProduct,
  getSingleProduct,
} from "./Categories.docs";
import {
  createProductBody,
  addOrRemoveWishlist,
  getProductsByBrand,
  getVendorProducts,
  updateVendorProduct,
  deleteVendorProduct,
} from "./Product.docs";

import {
  createFeaturedPost,
  createFeaturedPostBody,
  deleteFeaturedPost,
  getFeaturedPost,
  getFeaturedPosts,
  updateFeaturedPost,
} from "./Featured.docs";
import {
  addImagesToScrapbook,
  createScrapbook,
  deleteScrapbook,
  getScrapbook,
  getScrapbooks,
  removeImageFromScrapbook,
  updateScrapbook,
} from "./Scrapbook.docs";

//options object for swaggerjs
export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nene",
      version: "1.0.0",
      description: "An api for NeNe",
    },
    paths: {
      // for buyers
      "/buyers/register": {
        post: createBuyer,
      },
      "/buyers/confirm/{confirmationCode}": {
        get: verifyBuyerMail,
      },
      "/buyers/resend-confirm": {
        post: resendVerifyBuyerMail,
      },
      "/buyers/login": {
        post: loginBuyer,
      },
      "/buyers/update": {
        put: updateBuyer,
      },
      "/buyers/forgot-password": {
        post: forgotPasswordBuyer,
      },
      "/buyers/reset-password/{id}/{token}": {
        post: resetpasswordBuyer,
      },
      "/buyers/addToCart/{prodId}": {
        post: addToCart,
      },
      "/buyers/checkout/{cartId}": {
        post: checkOut,
      },

      // for vendors
      "/vendors/register": {
        post: createVendor,
      },
      "/vendors/confirm/{confirmationCode}": {
        get: verifyVendorMail,
      },
      "/vendors/resend-confirm": {
        post: resendVerifyVendorMail,
      },
      "/vendors/login": {
        post: loginVendor,
      },
      "/vendors/update": {
        put: updateVendor,
      },
      "/vendors/forgot-password": {
        post: forgotPasswordVendor,
      },
      "/vendors/reset-password/{id}/{token}": {
        post: resetpasswordVendor,
      },

      // For Categories
      "/categories/addCategory": {
        post: addCategory,
      },
      "/categories/{categoryId}/addSubCategory": {
        post: addSubCategory,
      },
      "/categories/createProduct": {
        post: createProduct,
      },
      "/categories": {
        get: getAllCategories,
      },
      "/categories/{categoryName}": {
        get: getAllProductsInCategory,
      },
      "/categories/{prodId}/getSingleProd": {
        get: getSingleProduct,
      },

      // For products
      "/products/brand/{brandName}": {
        get: getProductsByBrand,
      },
      "/products/{productId}/wishlist": {
        get: addOrRemoveWishlist,
      },
      "/products/my-products": {
        get: getVendorProducts,
      },
      "/products/{productId}/update": {
        put: updateVendorProduct,
      },
      "/products/{productId}": {
        delete: deleteVendorProduct,
      },

      // For featured
      "/featured": {
        post: createFeaturedPost,
      },
      "/featured/{slug}": {
        get: getFeaturedPost,
      },
      "/featured/getPosts": {
        get: getFeaturedPosts,
      },
      "/featured/{slug}/update": {
        put: updateFeaturedPost,
      },
      "/featured/{slug}/delete": {
        delete: deleteFeaturedPost,
      },

      // For scrapbook
      "/scrapbook": {
        post: createScrapbook,
      },
      "/scrapbook/{scrapbookId}": {
        get: getScrapbook,
      },
      "/scrapbook/getBooks": {
        get: getScrapbooks,
      },
      "/scrapbook/{scrapbookId}/update": {
        put: updateScrapbook,
      },
      "/scrapbook/{scrapbookId}/delete": {
        delete: deleteScrapbook,
      },
      "/scrapbook/{scrapbookId}/addImages": {
        put: addImagesToScrapbook,
      },
      "/scrapbook/{scrapbookId}/removeImage": {
        delete: removeImageFromScrapbook,
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        createBuyerBody,
        createVendorBody,
        createCategoryBody,
        createProductBody,
        createFeaturedPostBody,
      },
    },
    servers: [
      {
        //update to production url
        url: `${config.BASE_URL}/api/`,
      },
    ],
    tags: [
      {
        name: "Buyers",
      },
      {
        name: "Vendors",
      },
      {
        name: "Categories",
      },
      {
        name: "Products",
      },
    ],
  },
  apis: ["../routes/index.ts"],
};
