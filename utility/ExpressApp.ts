import express, { Application, Request, Response } from "express";
import VendorRoutes from "../routes/Vendor.route";
import BuyerRoutes from "../routes/Buyer.route";
import CategoryRoutes from "../routes/Category.route";
import ProductRoutes from "../routes/Product.route";
import s3Image from "../routes/s3Image.route"
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import { errorHandler, notFound } from "../middlewares";
import hpp from "hpp";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "../docs/swagger";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //set cross origin resource sharing
  app.use(cors());

  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(helmet());

  // Prevent http para
  app.use(hpp());

  //setting up swagger doc
  const specs = swaggerJsDoc(options);
  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.get("/healthcheck", (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use("/api/vendors", VendorRoutes);
  app.use("/api/buyers", BuyerRoutes);
  app.use("/api/categories", CategoryRoutes);
  app.use("/api/products", ProductRoutes);
  app.use("/api/aws-s3", s3Image)
  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
