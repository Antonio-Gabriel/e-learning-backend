import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { MeUseCase } from "./MeUseCase";

class MeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const userProfileUseCase = container.resolve(MeUseCase);

    const user = await userProfileUseCase.execute(id);

    return response.json(classToPlain(user));
  }
}

export { MeController };
