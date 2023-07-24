import { ICreateCourseUsersDtos } from "../dtos/ICreateCourseUsersDtos";
import { CourseUser } from "../infra/typeorm/entities/CourseUser";

export interface ICourseUsersRepository {
  create({ user_id, course_id }: ICreateCourseUsersDtos): Promise<CourseUser>;
}
