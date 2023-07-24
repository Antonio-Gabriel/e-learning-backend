import { CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("courses_users")
class CourseUser {
  @PrimaryColumn()
  user_id: string;

  @PrimaryColumn()
  course_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export { CourseUser };
