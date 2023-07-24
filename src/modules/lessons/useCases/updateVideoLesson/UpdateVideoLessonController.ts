import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateVideoLessonUseCase } from "./UpdateVideoLessonUseCase";

class UpdateVideoLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const video = request.file.filename;

    const updateVideoLessonUseCase = container.resolve(
      UpdateVideoLessonUseCase
    );

    await updateVideoLessonUseCase.execute({ id, video });

    return response
      .status(200)
      .send({ message: "Lesson upload video successfully" });
  }
}

export { UpdateVideoLessonController };
