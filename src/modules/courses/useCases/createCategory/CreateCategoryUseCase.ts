import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { createCategorySchemeValidate } from "@modules/courses/validations";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    if (!(await createCategorySchemeValidate.isValid({ name }))) {
      throw new AppError("Validation fails");
    }

    const category = await this.categoriesRepository.findByName(name);

    if (category) {
      throw new AppError("Category already exists!");
    }

    await this.categoriesRepository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };
