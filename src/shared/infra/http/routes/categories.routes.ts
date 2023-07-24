import { Router } from "express";

import { CreateCategoryController } from "@modules/courses/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/courses/useCases/listCategories/ListCategoriesController";
import { UpdateCategoryController } from "@modules/courses/useCases/updateCategory/UpdateCategoryController";
import { DeleteCategoryController } from "@modules/courses/useCases/deleteCategory/DeleteCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const updateCategoryController = new UpdateCategoryController();
const deleteCategoryController = new DeleteCategoryController();

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.put("/:id", updateCategoryController.handle);
categoriesRoutes.delete("/:id", deleteCategoryController.handle);

export { categoriesRoutes };
