import { classToPlain } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLessonUseCase } from "./UpdateLessonUseCase";

class UpdateLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { title, module_id } = request.body;

    const updateLessonUseCase = container.resolve(UpdateLessonUseCase);

    const lesson = await updateLessonUseCase.execute({
      id,
      title,
      module_id,
    });

    return response.json(classToPlain(lesson));
  }
}

export { UpdateLessonController };
