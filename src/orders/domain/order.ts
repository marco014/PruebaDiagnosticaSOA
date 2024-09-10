export class Order {
    id: number | null;
    clientName: string;
    productId: number;
    cantidad: number;
    total: number;

    constructor(id: number | null, clientName: string, productId: number, cantidad: number, total: number) {
        this.id = id;
        this.clientName = clientName;
        this.productId = productId;
        this.cantidad = cantidad;
        this.total = total;
    }
}