import dotenv from 'dotenv';
dotenv.config();

import bodyParser from "body-parser";
import express from "express";

import { config } from "./config";
import { flowerRouter } from './flower/infraestructure/routes/flower-router';
import { orderRouter } from './orders/infraestructure/routes/user-router';

function boostrap() {
  const app = express();

  app.use(bodyParser.json());
  app.use("/orders", orderRouter);
  app.use("/catalog", flowerRouter);

  const { port } = config.server;

  app.listen(port, () => {
    console.log(`[APP] - Starting application on port ${port}`);
  });
}

boostrap();
