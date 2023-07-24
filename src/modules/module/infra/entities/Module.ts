import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";
import { v4 as uuidV4 } from "uuid";
import { Course } from "@modules/courses/infra/typeorm/entities/Course";

@Entity("modules")
class Module {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number;

  @Exclude()
  @Column()
  image: string;

  @Column()
  course_id: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  Course: Course;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "image_url" })
  image_url(): string {
    return `${process.env.NODE_ENV_API_URL}/modules/${this.image}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Module };
