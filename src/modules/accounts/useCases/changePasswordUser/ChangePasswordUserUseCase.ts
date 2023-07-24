import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { changePasswordSchemeValidate } from "@modules/accounts/validations";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
@injectable()
class ChangePasswordUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    id,
    oldPassword,
    password,
    confirmPassword,
  }: IRequest): Promise<void> {
    if (
      !(await changePasswordSchemeValidate.isValid({
        oldPassword,
        password,
        confirmPassword,
      }))
    ) {
      throw new AppError("Validation fails");
    }

    if (password === oldPassword) {
      throw new AppError("Password should be different from old password!");
    }

    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (oldPassword && !(await compare(oldPassword, user.password))) {
      throw new AppError("Password does not match");
    }

    const passwordHash = await hash(password, 8);

    Object.assign(user, {
      password: passwordHash,
      updated_at: new Date(),
    });

    await this.usersRepository.save(user);
  }
}

export { ChangePasswordUserUseCase };
