import { Flower } from "../domain/flower";
import { FlowerRepository } from "../domain/ports/flower-repository";

class GetFlowerCatalogUC {
    constructor(private flowerRepository: FlowerRepository) {}

    async execute(): Promise<Flower[]> {
        return this.flowerRepository.getFlowerCatalog();
    }
}

export default GetFlowerCatalogUC;