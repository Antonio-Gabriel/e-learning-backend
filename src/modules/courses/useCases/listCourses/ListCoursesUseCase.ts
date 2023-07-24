import { inject, injectable } from "tsyringe";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";

@injectable()
class ListCoursesUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository
  ) {}

  async execute(): Promise<Course[]> {
    const allCourses = await this.coursesRepository.findAll();

    return allCourses;
  }
}

export { ListCoursesUseCase };
