import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLessonUseCase } from "./CreateLessonUseCase";

class CreateLessonController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, module_id } = request.body;

    const video = request.file.filename;

    const createLessonUseCase = container.resolve(CreateLessonUseCase);

    await createLessonUseCase.execute({
      title,
      video,
      module_id,
    });

    return response
      .status(201)
      .send({ message: "Lesson created successfully" });
  }
}

export { CreateLessonController };
