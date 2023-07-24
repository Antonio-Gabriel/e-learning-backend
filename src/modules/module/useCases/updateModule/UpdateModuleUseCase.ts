import { inject, injectable } from "tsyringe";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { Module } from "@modules/module/infra/entities/Module";

import * as Yup from "yup";
import { AppError } from "@shared/errors/AppError";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { updateModuleSchemeValidate } from "@modules/module/validations";

interface IRequest {
  id: string;
  name: string;
  description: string;
  duration: number;
  course_id: string;
}

@injectable()
class UpdateModuleUseCase {
  constructor(
    @inject("CoursesRepository")
    private coursesRepository: ICoursesRepository,

    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository
  ) {}

  async execute({
    id,
    name,
    description,
    duration,
    course_id,
  }: IRequest): Promise<Module> {
    if (
      !(await updateModuleSchemeValidate.isValid({ name, course_id, duration }))
    ) {
      throw new AppError("Validation fails");
    }

    const course = await this.coursesRepository.findById(course_id);

    if (!course) {
      throw new AppError("Course does not exists!", 404);
    }

    const updateModule = await this.modulesRepository.findById(id);

    if (!updateModule) {
      throw new AppError("Module doesn't exists!");
    }

    if (name !== updateModule.name) {
      const updateModule = await this.modulesRepository.findByName(name);

      if (updateModule) {
        throw new AppError("Module already exists!");
      }
    }

    Object.assign(updateModule, {
      id,
      name,
      description,
      duration,
      course_id,
      updated_at: new Date(),
    });

    await this.modulesRepository.save(updateModule);

    return updateModule;
  }
}

export { UpdateModuleUseCase };
