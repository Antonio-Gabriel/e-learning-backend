import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class SearchUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(name: string): Promise<User[]> {
    const user = await this.usersRepository.findByName(name);

    return user;
  }
}

export { SearchUserUseCase };
