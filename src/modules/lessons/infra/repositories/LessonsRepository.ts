import { ICreateLessonDTO } from "@modules/lessons/dtos/ICreateLessonDTO";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { getRepository, Repository } from "typeorm";
import { Lesson } from "../entities/Lesson";

class LessonsRepository implements ILessonsRepository {
  private repository: Repository<Lesson>;

  constructor() {
    this.repository = getRepository(Lesson);
  }

  async create({
    id,
    title,
    module_id,
    video,
  }: ICreateLessonDTO): Promise<void> {
    const lesson = this.repository.create({
      id,
      title,
      video,
      module_id,
    });

    await this.repository.save(lesson);
  }

  async findAllPaginated(page: number): Promise<[Lesson[], number]> {
    const lessons = await this.repository.findAndCount({
      skip: page,
      take: 10,
    });

    return lessons;
  }

  async findByTitle(title: string): Promise<Lesson> {
    return await this.repository.findOne({ title });
  }

  async findById(id: string): Promise<Lesson> {
    return await this.repository.findOne({ id });
  }

  async findAll(): Promise<Lesson[]> {
    const lessons = await this.repository.find();

    return lessons;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}

export { LessonsRepository };
