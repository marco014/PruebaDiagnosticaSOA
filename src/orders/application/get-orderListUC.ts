import OrderRepository from "../domain/order-repository";
import { Order } from "../domain/order";

class GetOrderListUC {
    constructor(private orderRepository: OrderRepository) {}

    async execute(): Promise<Order[]> {
        return this.orderRepository.getAll();
      }
}

export default GetOrderListUC;