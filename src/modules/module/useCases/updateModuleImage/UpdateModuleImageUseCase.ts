import { IModulesRepository } from "@modules/module/repositories/IModulesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  image: string;
}

@injectable()
class UpdateModuleImageUseCase {
  constructor(
    @inject("ModulesRepository")
    private modulesRepository: IModulesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ id, image }: IRequest): Promise<void> {
    const modules = await this.modulesRepository.findById(id);

    if (!modules) {
      await this.storageProvider.delete(image, "");

      throw new AppError("Module does not exists!");
    }

    if (modules.image) {
      await this.storageProvider.delete(modules.image, "modules");
    }

    modules.image = image;

    await this.storageProvider.save(image, "modules");

    await this.modulesRepository.save(modules);
  }
}

export { UpdateModuleImageUseCase };
