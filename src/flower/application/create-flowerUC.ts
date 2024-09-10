import { FlowerRepository } from "../domain/ports/flower-repository";
import { Flower } from "../domain/flower";

class CreateFlowerUC {
    constructor(private flowerRepository: FlowerRepository) {}

    async execute(flower: Omit<Flower, 'id'>): Promise<Flower> {
        const newFlower = new Flower(
            null,
            flower.name,
            flower.description,
            flower.price,
            flower.image
        );
        
        return this.flowerRepository.create(newFlower);
    }
}

export default CreateFlowerUC;