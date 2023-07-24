import { Router } from "express";

import multer from "multer";
import uploadConfig from "@config/upload";

import { CreateModuleController } from "@modules/module/useCases/createModule/CreateModuleController";
import { ListModulesController } from "@modules/module/useCases/listModules/ListModulesController";
import { UpdateModuleImageController } from "@modules/module/useCases/updateModuleImage/UpdateModuleImageController";
import { UpdateModuleController } from "@modules/module/useCases/updateModule/UpdateModuleController";
import { DeleteModuleController } from "@modules/module/useCases/deleteModule/DeleteModuleController";

const modulesRoutes = Router();

const uploadImages = multer(uploadConfig);

const createModuleController = new CreateModuleController();
const listModulesController = new ListModulesController();
const updateModuleImageController = new UpdateModuleImageController();
const updateModuleController = new UpdateModuleController();
const deleteModuleController = new DeleteModuleController();

modulesRoutes.get("/", listModulesController.handle);
modulesRoutes.post(
  "/",
  uploadImages.single("image"),
  createModuleController.handle
);

modulesRoutes.patch(
  "/image/:id",
  uploadImages.single("image"),
  updateModuleImageController.handle
);

modulesRoutes.put("/:id", updateModuleController.handle);
modulesRoutes.delete("/:id", deleteModuleController.handle);

export { modulesRoutes };
