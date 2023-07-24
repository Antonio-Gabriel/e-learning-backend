import { Router } from "express";

import { CreateCourseController } from "@modules/courses/useCases/createCourse/CreateCourseController";
import { ListCoursesController } from "@modules/courses/useCases/listCourses/ListCoursesController";
import { UpdateCourseController } from "@modules/courses/useCases/updateCourses/UpdateCourseController";
import { DeleteCourseController } from "@modules/courses/useCases/deleteCourse/DeleteCourseController";
import { CreateCourseUsersController } from "@modules/courses/useCases/courseUsers/CreateCourseUsersController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const coursesRoutes = Router();

const createCourseController = new CreateCourseController();
const listCoursesController = new ListCoursesController();
const updateCourseController = new UpdateCourseController();
const deleteCourseController = new DeleteCourseController();
const createCourseUsersController = new CreateCourseUsersController();

coursesRoutes.get("/", listCoursesController.handle);
coursesRoutes.post("/", createCourseController.handle);
coursesRoutes.post(
  "/user",
  ensureAuthenticated,
  createCourseUsersController.handle
);

coursesRoutes.put("/:id", updateCourseController.handle);
coursesRoutes.delete("/:id", deleteCourseController.handle);

export { coursesRoutes };
