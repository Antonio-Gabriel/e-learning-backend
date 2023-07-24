import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCourseUseCase } from "./DeleteCourseUseCase";

class DeleteCourseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCourseUseCase = container.resolve(DeleteCourseUseCase);

    await deleteCourseUseCase.execute(id);

    return response
      .status(200)
      .send({ message: "Course successfully deleted" });
  }
}

export { DeleteCourseController };
