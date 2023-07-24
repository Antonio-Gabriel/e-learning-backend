import { ICreateModuleDtos } from "../dtos/ICreateModuleDtos";
import { Module } from "../infra/entities/Module";

export interface IModulesRepository {
  create(data: ICreateModuleDtos): Promise<void>;
  findByName(name: string): Promise<Module>;
  findAll(): Promise<Module[]>;
  findById(id: string): Promise<Module>;
  save(modules: Module): Promise<Module>;
  delete(id: string): Promise<void>;
}
