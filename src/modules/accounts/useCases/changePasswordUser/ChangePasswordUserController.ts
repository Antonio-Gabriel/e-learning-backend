import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangePasswordUserUseCase } from "./ChangePasswordUserUseCase";

class ChangePasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { oldPassword, password, confirmPassword } = request.body;

    const changePasswordUserUseCase = container.resolve(
      ChangePasswordUserUseCase
    );

    await changePasswordUserUseCase.execute({
      id,
      oldPassword,
      password,
      confirmPassword,
    });

    return response
      .status(200)
      .send({ message: "Change password successfully!" });
  }
}

export { ChangePasswordUserController };
