import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchUserUseCase } from "./SearchUserUseCase";

class SearchUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;

    const searchUserUseCase = container.resolve(SearchUserUseCase);

    const user = await searchUserUseCase.execute(String(search) || null);

    return response.status(200).json(user);
  }
}

export { SearchUserController };
