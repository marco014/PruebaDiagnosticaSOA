import { FlowerRepository } from "../domain/ports/flower-repository";

class DeleteFlowerUC {
    constructor(private flowerRepository: FlowerRepository) {}

    async execute(flowerId: string): Promise<boolean> {
        const result = await this.flowerRepository.delete(flowerId);

        if (!result) {
            throw new Error (`No podemos eliminar la flor con el id: ${flowerId}`);
        }

        console.log(`Flor con id: ${flowerId} ha sido eliminado`);
        return result; // Devuelve un booleano
    }
}

export default DeleteFlowerUC;