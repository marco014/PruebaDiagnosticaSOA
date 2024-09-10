import { Request, Response, NextFunction } from "express";
import CreateFlowerUC from "../../application/create-flowerUC";
import GetFlowerCatalogUC from "../../application/get-flowerCatalogUC";
import GetFlowerByIdUC from "../../application/get-flowerByIdUC";
import UpdateFlowerUC from "../../application/update-flowerUC";
import DeleteFlowerUC from "../../application/delete-flowerUC";
import { LocalFileStorage } from "../adapters/storages/local-file-storage";

const localFilestorage = new LocalFileStorage();

class FlowerController {
    constructor(
        private getFlowerCatalogUC: GetFlowerCatalogUC,
        private createFlowerUC: CreateFlowerUC,
        private getFlowerByIdUC: GetFlowerByIdUC,
        private updateFlowerUC: UpdateFlowerUC,
        private deleteFlowerUC: DeleteFlowerUC
    ) {}

    async create(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        try {
          const flowerPayload = req.body;
          const file = req.file;
    
          if (!file) {
            return res.status(400).send('No file uploaded');
          }
    
          // Guardar archivo localmente
          const localFilePath = await localFilestorage.uploadFile(file);
    
          const flowerData = { ...flowerPayload, image: localFilePath };
          const flower = await this.createFlowerUC.execute(flowerData);
    
          res.status(201).json(flower);
        } catch (error) {
          next(error);
        } finally {
          if (req.file) {
            console.log("Flor agregada con exito")
          }
        }
      }
    
      async getCatalog(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const flowers = await this.getFlowerCatalogUC.execute();
          res.json(flowers);
        } catch (error) {
          next(error);
        }
      }
    
      async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const id = req.params.id;
          const flower = await this.getFlowerByIdUC.run(id);
          res.json(flower);
        } catch (error) {
          next(error);
        }
      }
    
      async update(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        try {
          const flowerId = req.params.id;
          const flowerPayload = req.body;
          const file = req.file;
    
          // Obtener la publicación existente
          const existingFlower = await this.getFlowerByIdUC.run(flowerId);
          if (!existingFlower) {
            return res.status(404).send('Flor no encontrado');
          }
    
          // Eliminar imagen antigua si existe una nueva
          if (file) {
            await localFilestorage.deleteFile(existingFlower.image);
    
            // Guardar archivo localmente
            const localFilePath = await localFilestorage.uploadFile(file);
    
            flowerPayload.image = localFilePath;
          }
    
          const updatedFlower = await this.updateFlowerUC.execute(flowerId, flowerPayload);
          res.json(updatedFlower);
        } catch (error) {
          next(error);
        } finally {
          if (req.file) {
            console.log("Publicacion creada con exito");
          }
        }
      }
    
      async delete(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        try {
          const flowerId = req.params.id;
    
          // Obtener la publicación existente
          const existingFlower = await this.getFlowerByIdUC.run(flowerId);
          if (!existingFlower) {
            return res.status(404).send('Flower not found');
          }
    
          // Eliminar imagen del almacenamiento local
          await localFilestorage.deleteFile(existingFlower.image);
    
          const result = await this.deleteFlowerUC.execute(flowerId);
          res.status(result ? 200 : 404).json({ success: result });
        } catch (error) {
          next(error);
        } finally {
          if (req.file) {
            console.log("Flor eliminada con exito");
          }
        }
      }    
}

export default FlowerController;

