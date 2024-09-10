import { FlowerRepository } from "../domain/ports/flower-repository";
import { Flower } from "../domain/flower";

class UpdateFlowerUC {
    constructor(private flowerRepository: FlowerRepository) {}

    async execute(flowerId: string, flowerPayLoad: Partial<Flower>) {
        const result = await this.flowerRepository.update(flowerId, flowerPayLoad);

        if (!result) {
            throw new Error(`Id: ${flowerId} de la lista no fue encontrada`);
        }

    return result;
    }
}

export default UpdateFlowerUC;