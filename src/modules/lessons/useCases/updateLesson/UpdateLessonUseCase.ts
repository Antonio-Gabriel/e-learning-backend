import { Lesson } from "@modules/lessons/infra/entities/Lesson";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { updateLessonSchemeValidate } from "@modules/lessons/validations";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  title: string;
  module_id: string;
}
@injectable()
class UpdateLessonUseCase {
  constructor(
    @inject("LessonsRepository")
    private lessonsRepository: ILessonsRepository,
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository
  ) {}

  async execute({ id, title, module_id }: IRequest): Promise<Lesson> {
    if (!(await updateLessonSchemeValidate.isValid({ title, module_id }))) {
      throw new AppError("Validation fails");
    }

    const modules = await this.modulesRepository.findById(module_id);

    if (!modules) {
      throw new AppError("module does not exists!");
    }

    const lesson = await this.lessonsRepository.findById(id);

    if (!lesson) {
      throw new AppError("Lessons does not exists!");
    }

    if (title !== lesson.title) {
      const lesson = await this.lessonsRepository.findByTitle(title);

      if (lesson) {
        throw new AppError("Lessons already exists!");
      }
    }

    Object.assign(lesson, {
      title,
      module_id,
      id,
      updated_at: new Date(),
    });

    await this.lessonsRepository.create(lesson);

    return lesson;
  }
}

export { UpdateLessonUseCase };
