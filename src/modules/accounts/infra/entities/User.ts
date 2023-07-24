import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

import { v4 as uuidV4 } from "uuid";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  bi: string;

  @Column()
  county: string;

  @Column()
  city: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  avatar: string;

  @Column()
  isAdmin: boolean;

  @ManyToMany(() => Course)
  @JoinTable({
    name: "courses_users",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "course_id" }],
  })
  courses: Course[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    if (this.avatar !== null) {
      return `${process.env.NODE_ENV_API_URL}/avatar/${this.avatar}`;
    }
    return null;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
