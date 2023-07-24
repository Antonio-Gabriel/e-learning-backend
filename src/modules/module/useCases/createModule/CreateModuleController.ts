import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateModuleUseCase } from "./CreateModuleUseCase";

class CreateModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, duration, course_id } = request.body;

    const image = request.file.filename;

    const createModuleUseCase = container.resolve(CreateModuleUseCase);

    await createModuleUseCase.execute({
      name,
      description,
      duration,
      image,
      course_id,
    });

    return response.status(201).send();
  }
}

export { CreateModuleController };
