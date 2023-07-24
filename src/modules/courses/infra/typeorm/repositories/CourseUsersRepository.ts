import { getRepository, Repository } from "typeorm";
import { ICreateCourseUsersDtos } from "@modules/courses/dtos/ICreateCourseUsersDtos";
import { ICourseUsersRepository } from "@modules/courses/repositories/ICourseUsersRepository";
import { CourseUser } from "../entities/CourseUser";

class CourseUsersRepository implements ICourseUsersRepository {
  private repository: Repository<CourseUser>;

  constructor() {
    this.repository = getRepository(CourseUser);
  }

  async create({
    user_id,
    course_id,
  }: ICreateCourseUsersDtos): Promise<CourseUser> {
    const create = this.repository.create({
      user_id,
      course_id,
    });

    await this.repository.save(create);

    return create;
  }
}

export { CourseUsersRepository };
