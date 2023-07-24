import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCoursesUseCase } from "./ListCoursesUseCase";

class ListCoursesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCoursesUseCase = container.resolve(ListCoursesUseCase);

    const allCourses = await listCoursesUseCase.execute();

    return response.json(classToPlain(allCourses));
  }
}

export { ListCoursesController };
