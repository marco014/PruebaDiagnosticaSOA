import { Order } from './order';

export interface OrderRepository {
    getAll(): Promise<Order[]>;
    create(order: Order): Promise<Order>;
    getOderById(orderId: string): Promise<Order | null>;
    updateOrder(orderId: string, order: Partial<Order>): Promise<Order | null>;
    deleteOrder(orderId: string): Promise<boolean>;
}

export default OrderRepository;