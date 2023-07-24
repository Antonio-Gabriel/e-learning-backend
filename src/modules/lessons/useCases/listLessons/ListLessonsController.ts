import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";
import { ListLessonsUseCase } from "./ListLessonsUseCase";

class ListLessonsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listLessonsUseCase = container.resolve(ListLessonsUseCase);

    const all = await listLessonsUseCase.execute();

    return response.json(classToPlain(all));
  }
}

export { ListLessonsController };
