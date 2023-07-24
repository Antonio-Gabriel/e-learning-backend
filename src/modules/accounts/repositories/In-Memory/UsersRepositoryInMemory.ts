import { ICreateUsersDto } from "@modules/accounts/dtos/ICreateUsersDto";
import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }
  listAllUsers(): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async create({ name, email, password }: ICreateUsersDto): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
    });

    this.users.push(user);
  }
}
