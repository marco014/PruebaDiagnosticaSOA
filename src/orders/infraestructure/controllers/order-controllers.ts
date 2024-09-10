import { Request, Response, NextFunction } from "express";
import CreateOrderUC from "../../application/create-orderUC";
import GetOrderListUC from "../../application/get-orderListUC";
import GetOrderByIdUC from "../../application/get-orderByIdUC";
import UpdateOrderUC from "../../application/update-orderUC";
import DeleteOrderUC from "../../application/delete-orderUC";

class OrderController {
    constructor(
        private getOrderListUC: GetOrderListUC,
        private createOrderUC: CreateOrderUC,
        private getOrderByIdUC: GetOrderByIdUC,
        private updateOrderUC: UpdateOrderUC,
        private deleteOrderUC: DeleteOrderUC
      ) {}
    
      async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const orderPayload = req.body;
          const order = await this.createOrderUC.execute(orderPayload);
          res.status(201).json(order);
        } catch (error) {
          next(error);
        }
      }
    
      async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const orders = await this.getOrderListUC.execute();
          res.json(orders);
        } catch (error) {
          next(error);
        }
      }
    
      async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const order = await this.getOrderByIdUC.run(req.params.id);
          res.json(order);
        } catch (error) {
          next(error);
        }
      }
    
      async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const orderId = req.params.id;
          const orderPayload = req.body;
          const updatedOrder = await this.updateOrderUC.execute(orderId, orderPayload);
          res.json(updatedOrder);
        } catch (error) {
          next(error);
        }
      }
    
      async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const orderId = req.params.id;
          const result = await this.deleteOrderUC.execute(orderId);
          res.status(result ? 200 : 404).json({ success: result });
        } catch (error) {
          next(error);
        }
      }
}

export default OrderController;