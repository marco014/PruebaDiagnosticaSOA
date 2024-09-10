import OrderRepository from "../domain/order-repository";
import { Order } from "../domain/order";

class UpdateOrderUC {
    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: string, orderPayload: Partial<Order>): Promise<Order> {
        const result = await this.orderRepository.updateOrder(orderId, orderPayload);

        if (!result) {
        throw new Error(`Id: ${orderId} de pedido no encontrada`);
        }

        return result;
    }
}

export default UpdateOrderUC;