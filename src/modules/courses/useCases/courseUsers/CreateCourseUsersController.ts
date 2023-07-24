import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCourseUsersUseCase } from "./CreateCourseUsersUseCase";

class CreateCourseUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { course_id } = request.body;

    const createCourseUsersUseCase = container.resolve(
      CreateCourseUsersUseCase
    );

    const create = await createCourseUsersUseCase.execute({
      user_id: id,
      course_id,
    });

    return response.status(201).json(create);
  }
}

export { CreateCourseUsersController };
