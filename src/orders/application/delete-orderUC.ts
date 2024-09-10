import { OrderRepository } from '../domain/order-repository';

class DeleteOrderUC {
    constructor(private orderRepository: OrderRepository) {}

    async execute(orderId: string): Promise<boolean> {
        const result = await this.orderRepository.deleteOrder(orderId);

        if (!result) {
            throw new Error(`No se pudo eliminar el pedido con id: ${orderId}`);
        }

        console.log(`Pedido con id: ${orderId} ha sido eliminado`);
    return result;
    }
}


export default DeleteOrderUC;