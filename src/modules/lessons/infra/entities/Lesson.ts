import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Exclude, Expose } from "class-transformer";

@Entity("lessons")
class Lesson {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Exclude()
  @Column()
  video: string;

  @Column()
  module_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: "video_url" })
  video_url(): string {
    return `${process.env.NODE_ENV_API_URL}/lessons/${this.video}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Lesson };
