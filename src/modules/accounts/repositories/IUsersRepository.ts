import { ICreateUsersDto } from "../dtos/ICreateUsersDto";
import { User } from "../infra/entities/User";

interface IUsersRepository {
  create(data: ICreateUsersDto): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByBI(bi: string): Promise<User>;
  findByName(name: string): Promise<User[]>;
  findByIdShowDetails(id: string): Promise<User>;
  findAllPaginated(page: number): Promise<[User[], number]>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}

export { IUsersRepository };
