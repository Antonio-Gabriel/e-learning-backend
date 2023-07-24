import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/accounts/infra/repositories/UsersRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CategoriesRepository } from "@modules/courses/infra/typeorm/repositories/CategoriesRepository";
import { ICategoriesRepository } from "@modules/courses/repositories/ICategoriesRepository";
import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { CoursesRepository } from "@modules/courses/infra/typeorm/repositories/CoursesRepository";
import { ICourseUsersRepository } from "@modules/courses/repositories/ICourseUsersRepository";
import { CourseUsersRepository } from "@modules/courses/infra/typeorm/repositories/CourseUsersRepository";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { ModulesRepository } from "@modules/module/infra/repositories/ModulesRepository";
import { ILessonsRepository } from "@modules/lessons/repositories/ILessonsRepository";
import { LessonsRepository } from "@modules/lessons/infra/repositories/LessonsRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/repositories/UsersTokensRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICoursesRepository>(
  "CoursesRepository",
  CoursesRepository
);

container.registerSingleton<ICourseUsersRepository>(
  "CourseUsersRepository",
  CourseUsersRepository
);

container.registerSingleton<IModulesRepository>(
  "ModulesRepository",
  ModulesRepository
);

container.registerSingleton<ILessonsRepository>(
  "LessonsRepository",
  LessonsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);
