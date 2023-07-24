import { Course } from "../entities/Course";
import { ICreateCourseDtos } from "@modules/courses/dtos/ICreateCourseDtos";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { getRepository, Repository } from "typeorm";

export class CoursesRepository implements ICoursesRepository {
  private repository: Repository<Course>;

  constructor() {
    this.repository = getRepository(Course);
  }

  async create({
    name,
    description,
    category_id,
    // user_id,
    id,
  }: ICreateCourseDtos): Promise<void> {
    const course = this.repository.create({
      name,
      description,
      category_id,
      id,
    });

    await this.repository.save(course);
  }

  async findByName(name: string): Promise<Course> {
    return await this.repository.findOne({ name });
  }

  async findById(id: string): Promise<Course> {
    return await this.repository.findOne({ id });
  }

  async findAll(): Promise<Course[]> {
    const courseQuery = this.repository
      .createQueryBuilder("c")
      .innerJoinAndSelect("c.category", "category")
      .leftJoinAndSelect("c.modules", "modules")
      .loadRelationCountAndMap("c.totalUsers", "c.users")
      .loadRelationCountAndMap("c.totalModules", "c.modules");

    const course = await courseQuery.getMany();

    return course;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}
