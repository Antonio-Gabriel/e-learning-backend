import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";

@injectable()
class DeleteCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.coursesRepository.findById(id);

    if (!category) {
      throw new AppError("Course not found!", 404);
    }

    await this.coursesRepository.delete(id);
  }
}

export { DeleteCourseUseCase };
