import { Module } from "@modules/module/infra/entities/Module";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListModulesUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository
  ) {}

  async execute(): Promise<Module[]> {
    const all = await this.modulesRepository.findAll();

    return all;
  }
}

export { ListModulesUseCase };
