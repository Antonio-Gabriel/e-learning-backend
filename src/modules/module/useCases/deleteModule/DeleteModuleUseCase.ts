import { inject, injectable } from "tsyringe";
import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { AppError } from "@shared/errors/AppError";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

@injectable()
class DeleteModuleUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string): Promise<void> {
    const deleteModule = await this.modulesRepository.findById(id);

    if (!deleteModule) {
      throw new AppError("Module does not exists!");
    }

    await this.storageProvider.delete(deleteModule.image, "modules");

    await this.modulesRepository.delete(id);
  }
}

export { DeleteModuleUseCase };
