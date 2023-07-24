import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

class UpdateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, category_id } = request.body;

    const updateCourseUseCase = container.resolve(UpdateCourseUseCase);

    const course = await updateCourseUseCase.execute({
      id,
      name,
      description,
      category_id,
    });

    return response.json(course);
  }
}

export { UpdateCourseController };
