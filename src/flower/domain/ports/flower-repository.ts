import { Flower } from "../flower";

export interface FlowerRepository {
    getFlowerCatalog(): Promise<Flower[]>;
    getById(id: string): Promise<Flower | null>;
    create(flower: Flower): Promise<Flower>;
    update(id: string, flower: Partial<Flower>): Promise<Flower | null>;
    delete(id: string): Promise<boolean>;
}