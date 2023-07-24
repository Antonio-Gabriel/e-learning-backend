import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

class CreateCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, category_id } = request.body;

    const createCourseUseCase = container.resolve(CreateCourseUseCase);

    await createCourseUseCase.execute({
      name,
      description,
      category_id,
    });

    return response
      .status(201)
      .send({ message: "Course created successfully" });
  }
}

export { CreateCourseController };
