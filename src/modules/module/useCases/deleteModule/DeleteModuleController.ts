import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteModuleUseCase } from "./DeleteModuleUseCase";

class DeleteModuleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteModuleUseCase = container.resolve(DeleteModuleUseCase);

    await deleteModuleUseCase.execute(id);

    return response
      .status(200)
      .json({ message: "Module successfully deleted" });
  }
}

export { DeleteModuleController };
