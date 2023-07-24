import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateModuleImageUseCase } from "./UpdateModuleImageUseCase";

class UpdateModuleImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const image = request.file.filename;

    const updateModuleImageUseCase = container.resolve(
      UpdateModuleImageUseCase
    );

    await updateModuleImageUseCase.execute({ id, image });

    return response.status(200).send();
  }
}

export { UpdateModuleImageController };
