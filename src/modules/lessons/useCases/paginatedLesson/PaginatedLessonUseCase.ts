import { Lesson } from "@modules/lessons/infra/entities/Lesson";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { IPaginated } from "interface/IPaginated";
import { inject, injectable } from "tsyringe";

interface IRequest {
  page: number;
}

@injectable()
class PaginatedLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository
  ) {}

  async execute({ page }: IRequest): Promise<IPaginated<Lesson>> {
    const [lessons, total] = await this.lessonsRepository.findAllPaginated(
      page * 10
    );

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Lesson> = {
      data: lessons,
      totalElements: total,
      page,
      elements: lessons.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export { PaginatedLessonUseCase };
