import { inject, injectable } from "tsyringe";
import { ICreateUsersDto } from "@modules/accounts/dtos/ICreateUsersDto";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { hash } from "bcrypt";
import { createUserSchemeValidate } from "@modules/accounts/validations";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password }: ICreateUsersDto): Promise<void> {
    if (!(await createUserSchemeValidate.isValid({ name, email, password }))) {
      throw new AppError("Validation fails");
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
