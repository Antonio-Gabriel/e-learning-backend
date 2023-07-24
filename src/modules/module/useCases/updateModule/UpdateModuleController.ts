import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateModuleUseCase } from "./UpdateModuleUseCase";

class UpdateModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description, duration, course_id } = request.body;

    const updateModuleUseCase = container.resolve(UpdateModuleUseCase);

    const updateModule = await updateModuleUseCase.execute({
      id,
      name,
      description,
      duration,
      course_id,
    });

    return response.status(200).json(updateModule);
  }
}

export { UpdateModuleController };
