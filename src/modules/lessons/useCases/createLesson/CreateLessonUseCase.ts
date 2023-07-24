import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { createLessonSchemeValidate } from "@modules/lessons/validations";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  title: string;
  video: string;
  module_id: string;
}

@injectable()
class CreateLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository,
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ title, video, module_id }: IRequest): Promise<void> {
    if (
      !(await createLessonSchemeValidate.isValid({ title, video, module_id }))
    ) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Validation fails");
    }

    const modules = await this.modulesRepository.findById(module_id);

    if (!modules) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Module does not exists!");
    }

    const lesson = await this.lessonsRepository.findByTitle(title);

    if (lesson) {
      await this.storageProvider.delete(video, "");

      throw new AppError("Lesson already exists!");
    }

    await this.storageProvider.save(video, "lessons");

    await this.lessonsRepository.create({
      title,
      video,
      module_id,
    });
  }
}

export { CreateLessonUseCase };
