import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLessonUseCase } from "./DeleteLessonUseCase";

class DeleteLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLessonUseCase = container.resolve(DeleteLessonUseCase);

    await deleteLessonUseCase.execute(id);

    return response
      .status(200)
      .json({ message: "Lesson successfully deleted" });
  }
}

export { DeleteLessonController };
