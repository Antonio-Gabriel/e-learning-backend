import { User } from "@modules/accounts/infra/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IPaginated } from "interface/IPaginated";
import { inject, injectable } from "tsyringe";

interface IRequest {
  page: number;
}

@injectable()
class PaginatedUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ page }: IRequest): Promise<IPaginated<User>> {
    const [users, total] = await this.usersRepository.findAllPaginated(
      page * 10
    );

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<User> = {
      data: users,
      totalElements: total,
      page,
      elements: users.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export { PaginatedUserUseCase };
