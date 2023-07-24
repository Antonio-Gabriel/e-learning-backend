import { User } from "@modules/accounts/infra/entities/User";
import { Module } from "@modules/module/infra/entities/Module";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Category } from "./Category";

@Entity("courses")
class Course {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column()
  category_id?: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "courses_users",
    joinColumns: [{ name: "course_id" }],
    inverseJoinColumns: [{ name: "user_id" }],
  })
  users: User[];

  @OneToMany((type) => Module, (Modules) => Modules.Course)
  @JoinTable()
  modules: Module[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Course };
