import { FlowerRepository } from "../domain/ports/flower-repository";

class GetFlowerByIdUC {
    constructor(private readonly flowerRepository: FlowerRepository) {}

    async run(flowerId: string) {
        const flower = await this.flowerRepository.getById(flowerId);

        if (!flower) {
            throw new Error(`Id: ${flowerId} de la lista no fue encontrada`); // Lanza el error        }
        }

        return flower;
        console.log(flower);
    }
}

export default GetFlowerByIdUC;