import { query } from "../../database/mysql";
import { Flower } from "../../../domain/flower";
import { FlowerRepository } from "../../../domain/ports/flower-repository";

export class MYSQLFlowerRepository implements FlowerRepository {
    
    async getFlowerCatalog(): Promise<Flower[]> {
        const sql = 'SELECT * FROM Flores';
        const rows = await query(sql, []) as any[]; // Ajuste de tipo aquí
    
        return rows.map((row: any) => new Flower(
        row.id,
        row.name,
        row.description,
        row.price,
        row.image
        ));
    }

    async getById(id: string): Promise<Flower | null> {
        const sql = 'SELECT * FROM Flores WHERE id = ?';
        const params = [id];
        const [row]: any[] = await query(sql, params);
        // console.log(row);
        
        if (row.length === 0) {
          return null;
        }
    
        return new Flower(
          row.id,
          row.name,
          row.description,
          row.price,
          row.image
        );
      }
    
      async create(flower: Flower): Promise<Flower> {
        const sql = 'INSERT INTO Flores (name, type, price, image) VALUES (?, ?, ?, ?)';
        const params = [flower.name, flower.description, flower.price, flower.image];
        const result: any = await query(sql, params);
    
        return new Flower(result.insertId, flower.name, flower.description, flower.price, flower.image);
      }
    
      async update(id: string, flower: Partial<Flower>): Promise<Flower | null> {
        const sql = `UPDATE Flores SET 
                     name = COALESCE(?, name), 
                     description = COALESCE(?, description), 
                     price = COALESCE(?, price), 
                     image = COALESCE(?, image)
                     WHERE id = ?`;
        const params = [
          flower.name,
          flower.description,
          flower.price,
          flower.image,
          id
        ];
        const result: any = await query(sql, params);
    
        if (result.affectedRows === 0) {
          return null;
        }
    
        return await this.getById(id); // Obteniene la actualización para devolverla
      }
    
      async delete(id: string): Promise<boolean> {
        const sql = "DELETE FROM Flores WHERE id = ?";
        const params = [id];
        const result: any = await query(sql, params);
    
        return result.affectedRows > 0;
      }
}