import express from "express";

import { orderController } from "../dependencies";

const orderRouter = express.Router();

orderRouter.get("/", orderController.getAll.bind(orderController)); 
orderRouter.post("/", orderController.create.bind(orderController)); 
orderRouter.get("/:id", orderController.getById.bind(orderController))
orderRouter.put('/:id', orderController.update.bind(orderController));
orderRouter.delete('/:id', orderController.delete.bind(orderController));

export { orderRouter }; 
