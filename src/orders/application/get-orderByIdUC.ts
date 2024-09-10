import OrderRepository from "../domain/order-repository";

class GetOrderByIdUC {
    constructor(private readonly orderRepository : OrderRepository) {}

    async run(orderId: string) {
        const order = await this.orderRepository.getOderById(orderId);
    
        if (!order) {
          throw new Error(`Id: ${orderId} de pedido no encontrada`); //Lanza el error
        }
        // En el caso de que exista imprimira el email de este
        console.log(order);
        
        return this.orderRepository.getOderById(orderId);
      }
}

export default GetOrderByIdUC;