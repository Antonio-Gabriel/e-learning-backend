import { ICreateCategoriesDtos } from "../dtos/ICreateCategoriesDtos";
import { Category } from "../infra/typeorm/entities/Category";

interface ICategoriesRepository {
  create(data: ICreateCategoriesDtos): Promise<void>;
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  findAll(): Promise<Category[]>;
  delete(id: string): Promise<void>;
}

export { ICategoriesRepository };
