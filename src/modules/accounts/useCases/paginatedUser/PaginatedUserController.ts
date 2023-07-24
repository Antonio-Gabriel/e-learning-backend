import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";
import { PaginatedUserUseCase } from "./PaginatedUserUseCase";

class PaginatedUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const paginatedUserUseCase = container.resolve(PaginatedUserUseCase);

    const users = await paginatedUserUseCase.execute({
      page: page !== undefined ? parseInt(String(page), 10) : 0,
    });

    return response.status(200).json(classToPlain(users));
  }
}

export { PaginatedUserController };
