import { ICreateLessonDTO } from "../dtos/ICreateLessonDTO";
import { Lesson } from "../infra/entities/Lesson";

interface ILessonsRepository {
  create(data: ICreateLessonDTO): Promise<void>;
  findByTitle(title: string): Promise<Lesson>;
  findById(id: string): Promise<Lesson>;
  findAll(): Promise<Lesson[]>;
  findAllPaginated(page: number): Promise<[Lesson[], number]>;
  delete(id: string): Promise<void>;
}

export { ILessonsRepository };
