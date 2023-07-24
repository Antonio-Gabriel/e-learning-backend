import { Request, Response } from "express";
import { container } from "tsyringe";
import { PaginatedLessonUseCase } from "./PaginatedLessonUseCase";

class PaginatedLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const paginatedLessonUseCase = container.resolve(PaginatedLessonUseCase);

    const lessons = await paginatedLessonUseCase.execute({
      page: page !== undefined ? parseInt(String(page), 10) : 0,
    });

    return response.status(200).json(lessons);
  }
}
export { PaginatedLessonController };
