import express from 'express';
import { flowercontroller } from '../flower-dependencies';
import { upload } from '../adapters/storages/local-file-storage';

const flowerRouter = express.Router();

flowerRouter.get("/", flowercontroller.getCatalog.bind(flowercontroller));
flowerRouter.post("/", upload.single('image'), flowercontroller.create.bind(flowercontroller));
flowerRouter.get("/:id", flowercontroller.getById.bind(flowercontroller));
flowerRouter.put("/:id", upload.single('image'), flowercontroller.update.bind(flowercontroller));
flowerRouter.delete("/:id", flowercontroller.delete.bind(flowercontroller));

export { flowerRouter };