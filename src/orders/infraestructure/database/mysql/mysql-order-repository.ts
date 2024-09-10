import { query } from "./mysql";
import { Order } from "../../../domain/order";
import OrderRepository from "../../../domain/order-repository";

export class MySQLOrderRpository implements OrderRepository {
    async getAll(): Promise<Order[]> {
        const sql = 'SELECT * FROM pedidos';
        const rows = await query(sql, []) as any[];
        console.log('=>', rows);
    
        return rows.map((row: any) => new Order(
          row.id,
          row.client_name,
          row.producto_id,
          row.cantidad,
          row.total
        ));
      }
    
      async create(order: Order): Promise<Order> {
        const sql = 'INSERT INTO pedidos (client_name, producto_id, cantidad, total) VALUES (?, ?, ?, ?)';
        const params = [order.clientName, order.productId, order.cantidad, order.total];
        const result: any = await query(sql, params);
    
        return new Order(result.insertId, order.clientName, order.productId, order.cantidad, order.total);
      }
    
      async getOderById(id: string): Promise<Order | null> {
        const sql = 'SELECT * FROM pedidos WHERE id = ?';
        const params = [id];
        const rows = await query(sql, params) as any[];
        
        if (rows.length === 0) {
          return null;
        }
    
        const row = rows[0];
        const user = new Order(
          row.id,
          row.client_name,
          row.producto_id,
          row.cantidad,
          row.total
        );
        console.log(user);
    
        return user;
      }
    
      async updateOrder(id: string, newOrder: Partial<Order>): Promise<Order | null> {
        const sql = "UPDATE pedidos SET client_name=?, producto_id=?, cantidad=?, total=? WHERE id = ?";
        const params = [newOrder.clientName, newOrder.productId, newOrder.cantidad, newOrder.total, id];
        const result: any = await query(sql, params);
    
        if (result.affectedRows === 0) {
          return null;
        }
    
        return await this.getOderById(id); 
      }
    
      async deleteOrder(id: string): Promise<boolean> {
        const sql = "DELETE FROM pedidos WHERE id = ?";
        const params = [id];
        const result: any = await query(sql, params);
    
        return result.affectedRows > 0;
      }
}