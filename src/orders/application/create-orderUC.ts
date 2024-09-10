import { OrderRepository } from '../domain/order-repository';
import { Order } from "../domain/order";

class  CreateOrderUC {
    constructor(private orderRepository: OrderRepository) {}

    async execute(order: Omit<Order, 'id'>): Promise<Order> {
        const newOrder = new Order(
            null,
            order.clientName,
            order.productId,
            order.cantidad,
            order.total
        );

        return this.orderRepository.create(newOrder);
    }
}

export default CreateOrderUC;