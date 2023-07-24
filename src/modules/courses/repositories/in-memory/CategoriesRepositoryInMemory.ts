import { ICreateCategoriesDtos } from "@modules/courses/dtos/ICreateCategoriesDtos";
import { Category } from "@modules/courses/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private repository: Category[];

  constructor() {
    this.repository = [];
  }

  async create({ name, description }: ICreateCategoriesDtos): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.repository.push(category);
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.find((category) => category.name === name);
  }

  async findById(id: string): Promise<Category> {
    return this.repository.find((category) => category.id === id);
  }

  async findAll(): Promise<Category[]> {
    const all = this.repository;
    return all;
  }
}

export { CategoriesRepositoryInMemory };
