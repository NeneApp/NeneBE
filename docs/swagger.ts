import config from '../config/environment';
import {
  createBuyer,
  createBuyerBody,
  forgotPasswordBuyer,
  loginBuyer,
  resendVerifyBuyerMail,
  updateBuyer,
  verifyBuyerMail,
} from './Buyer.docs';
import {
  createVendor,
  createVendorBody,
  forgotPasswordVendor,
  loginVendor,
  resendVerifyVendorMail,
  updateVendor,
  verifyVendorMail,
} from './Vendor.docs';

import {
  GetAllVendors,
  createVendorByAdminBody,
  createVendorByAdmins,
} from './Admin.docs';

import {
  getAllCategories,
  getAllProductsInCategory,
  createCategoryBody,
} from './Categories.docs';

//options object for swaggerjs
export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nene',
      version: '1.0.0',
      description: 'An api for NeNe',
    },
    paths: {
      // for buyers
      '/buyers/register': {
        post: createBuyer,
      },
      '/buyers/confirm/:confirmationCode': {
        get: verifyBuyerMail,
      },
      '/buyers/resend-confirm': {
        post: resendVerifyBuyerMail,
      },
      '/buyers/login': {
        post: loginBuyer,
      },
      '/buyers/update': {
        put: updateBuyer,
      },
      '/buyers/forgot-password': {
        post: forgotPasswordBuyer,
      },

      // for vendors
      '/vendors/register': {
        post: createVendor,
      },
      '/vendors/confirm/:confirmationCode': {
        get: verifyVendorMail,
      },
      '/vendors/resend-confirm': {
        post: resendVerifyVendorMail,
      },
      '/vendors/login': {
        post: loginVendor,
      },
      '/vendors/update': {
        put: updateVendor,
      },
      '/vendors/forgot-password': {
        post: forgotPasswordVendor,
      },

      // For Categories
      '/categories': {
        get: getAllCategories,
      },
      '/categories/:categoryName': {
        get: getAllProductsInCategory,
      },

      // For Admins
      '/admin/vendor/create': {
        post: createVendorByAdmins,
      },
      '/admin/vendors': {
        get: GetAllVendors,
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        createBuyerBody,
        createVendorBody,
        createCategoryBody,
        createVendorByAdminBody,
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        //update to production url
        url: `${config.BASE_URL}/api/`,
      },
    ],
    tags: [
      {
        name: 'Buyers',
      },
      {
        name: 'Vendors',
      },
      {
        name: 'Categories',
      },
      {
        name: 'Admins',
      },
    ],
  },
  apis: ['../routes/index.ts'],
};
