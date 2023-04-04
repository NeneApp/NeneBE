import config from "../config/environment";
import { createBuyer, createBuyerBody, resendVerifyBuyerMail, verifyBuyerMail } from "./buyer.docs";

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
      "/buyers/register": {
        post: createBuyer,
      },
      "/buyers/confirm/:confirmationCode": {
        get: verifyBuyerMail,
      },
      "/resend-confirm": {
        post: resendVerifyBuyerMail,
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
        name: "Buyers",
      },
      {
        name: "Vendors",
      },
    ],
  },
  apis: ["../routes/index.ts"],
};
