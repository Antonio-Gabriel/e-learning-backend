import { ICreateCourseDtos } from "../dtos/ICreateCourseDtos";
import { Course } from "../infra/typeorm/entities/Course";

export interface ICoursesRepository {
  create(data: ICreateCourseDtos): Promise<void>;
  findByName(name: string): Promise<Course>;
  findById(id: string): Promise<Course>;
  findAll(): Promise<Course[]>;
  delete(id: string): Promise<void>;
}
