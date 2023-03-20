import express from 'express';
import log from './utility/logger';
import "dotenv/config";
import ExpressApp from './utility/ExpressApp';
import connectDB from './config/db';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';

import hpp from 'hpp';
import { errorHandler, notFound } from './middlewares';
import routeHandler from './routes';

const StartServer = async () => {
  
  const app = express();
  await ExpressApp(app);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  dotenv.config();

  // Sanitize data
  app.use(mongoSanitize());

  // Set security headers
  app.use(helmet());

  // Prevent http para
  app.use(hpp());

  app.get('/', (req,res) => {
    res.send('It works')
  })
  // path to routes
  app.use('/api/v1', routeHandler)
  
  // Error handler
  app.use(notFound);
  app.use(errorHandler);

  const PORT = process.env.PORT || 1335;

  await connectDB();

  app.listen(PORT, () => {
    log.info(`Server listening on ${PORT}`);
  });
};

StartServer();
