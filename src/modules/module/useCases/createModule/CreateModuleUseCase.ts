import { inject, injectable } from "tsyringe";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { createModuleSchemeValidate } from "@modules/module/validations";

interface IRequest {
  name: string;
  description: string;
  duration: number;
  image?: string;
  course_id: string;
}

@injectable()
class CreateModuleUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    name,
    description,
    duration,
    image,
    course_id,
  }: IRequest): Promise<void> {
    if (
      !(await createModuleSchemeValidate.isValid({
        name,
        course_id,
        duration,
        image,
      }))
    ) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      await this.storageProvider.save(image, "");
      throw new AppError("Course does not exists!");
    }

    const modules = await this.modulesRepository.findByName(name);

    if (modules) {
      await this.storageProvider.delete(image, "");
      throw new AppError("Modules already exists!");
    }

    await this.storageProvider.save(image, "modules");

    await this.modulesRepository.create({
      name,
      description,
      duration,
      image,
      course_id,
    });
  }
}

export { CreateModuleUseCase };
