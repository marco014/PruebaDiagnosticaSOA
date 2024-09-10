import CreateFlowerUC from "../application/create-flowerUC";
import DeleteFlowerUC from "../application/delete-flowerUC";
import GetFlowerByIdUC from "../application/get-flowerByIdUC";
import GetFlowerCatalogUC from "../application/get-flowerCatalogUC";
import UpdateFlowerUC from "../application/update-flowerUC";
import FlowerController from "./controllers/flower-controllers";
import { MYSQLFlowerRepository } from "./adapters/repositories/MySQL-flower-Repository";

const flowerRepository = new MYSQLFlowerRepository();

export const getFlowerCatalogUC = new GetFlowerCatalogUC(
    flowerRepository
);

export const createFlowerUC = new CreateFlowerUC(
    flowerRepository
);

export const getFlowerByIdUC = new GetFlowerByIdUC(
    flowerRepository
);

export const updateFlowerUC = new UpdateFlowerUC(
    flowerRepository
);

export const deleteFlowerUC = new DeleteFlowerUC(
    flowerRepository
);

export const flowercontroller = new FlowerController(
    getFlowerCatalogUC,
    createFlowerUC,
    getFlowerByIdUC,
    updateFlowerUC,
    deleteFlowerUC
);