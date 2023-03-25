import express, { Application, Request, Response } from 'express';
import VendorRoutes from '../routes/Vendor.route';
import BuyerRoutes from '../routes/Buyer.route';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import { errorHandler, notFound } from '../middlewares';
import hpp from 'hpp';

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(helmet());

  // Prevent http para
  app.use(hpp());

  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/api/vendors', VendorRoutes);
  app.use('/api/buyers', BuyerRoutes);

  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  return app;
};
