import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

export default async (app: Application) => {
  // Routes
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get('/healthcheck', (req: Request, res: Response) => {
    res.sendStatus(200);
  });

  return app;
};
