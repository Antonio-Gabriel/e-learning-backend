import { Lesson } from "@modules/lessons/infra/entities/Lesson";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListLessonsUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository
  ) {}

  async execute(): Promise<Lesson[]> {
    return await this.lessonsRepository.findAll();
  }
}

export { ListLessonsUseCase };
