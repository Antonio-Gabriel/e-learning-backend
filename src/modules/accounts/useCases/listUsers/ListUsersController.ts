import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listUsersUseCase = container.resolve(ListUsersUseCase);

    const users = await listUsersUseCase.execute();

    return response.json(classToPlain(users));
  }
}

export { ListUsersController };
