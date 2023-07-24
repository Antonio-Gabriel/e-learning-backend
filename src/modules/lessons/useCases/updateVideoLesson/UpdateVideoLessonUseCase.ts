import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  video: string;
}

@injectable()
class UpdateVideoLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ id, video }: IRequest): Promise<void> {
    const lesson = await this.lessonsRepository.findById(id);

    if (!lesson) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Lessons does not exists!");
    }

    if (lesson.video) {
      await this.storageProvider.delete(lesson.video, "lessons");
    }

    lesson.video = video;

    await this.storageProvider.save(video, "lessons");

    await this.lessonsRepository.create(lesson);
  }
}

export { UpdateVideoLessonUseCase };
