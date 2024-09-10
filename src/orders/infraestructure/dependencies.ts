import CreateOrderUC from "../application/create-orderUC";
import DeleteOrderUC from "../application/delete-orderUC";
import GetOrderByIdUC from "../application/get-orderByIdUC";
import GetOrderListUC from "../application/get-orderListUC";
import UpdateOrderUC from "../application/update-orderUC";
import OrderController from "./controllers/order-controllers";
import { MySQLOrderRpository } from "./database/mysql/mysql-order-repository";

const mysqlOrderRepository = new MySQLOrderRpository;

export const getOrderListUC = new GetOrderListUC(
    mysqlOrderRepository
  );
  
  export const createOrderUC = new CreateOrderUC(
    mysqlOrderRepository
  );
  
  export const getOrderByIdUC = new GetOrderByIdUC(
    mysqlOrderRepository
  );
  
  export const updateOrderUC = new UpdateOrderUC(
    mysqlOrderRepository
  );
  
  export const deleteOrderUC = new DeleteOrderUC(
    mysqlOrderRepository
  );
  
  export const orderController = new OrderController(
    getOrderListUC, 
    createOrderUC, 
    getOrderByIdUC, 
    updateOrderUC, 
    deleteOrderUC
  );