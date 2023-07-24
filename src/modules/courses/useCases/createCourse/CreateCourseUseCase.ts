import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { createCourseSchemeValidate } from "@modules/courses/validations";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  category_id: string;
  // user_id?: string;
}

@injectable()
class CreateCourseUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) { }

  async execute({
    name,
    description,
    category_id,
  }: // user_id,
    IRequest): Promise<void> {
    if (!(await createCourseSchemeValidate.isValid({ name, category_id }))) {
      throw new AppError("Validation fails");
    }

    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError("Category does not exists!", 404);
    }

    const course = await this.coursesRepository.findByName(name);

    if (course) {
      throw new AppError("Course already exists!");
    }

    await this.coursesRepository.create({
      name,
      description,
      category_id,
      // user_id,
    });
  }
}

export { CreateCourseUseCase };
