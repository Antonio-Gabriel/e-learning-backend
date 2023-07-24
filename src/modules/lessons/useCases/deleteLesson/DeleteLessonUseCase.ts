import { inject, injectable } from "tsyringe";

import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const lesson = await this.lessonsRepository.findById(id);

    if (!lesson) {
      throw new AppError("Lesson not found");
    }

    await this.storageProvider.delete(lesson.video, "lessons");

    await this.lessonsRepository.delete(id);
  }
}

export { DeleteLessonUseCase };
