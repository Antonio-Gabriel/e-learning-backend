import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError("Category not found!");
    }

    await this.categoriesRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
