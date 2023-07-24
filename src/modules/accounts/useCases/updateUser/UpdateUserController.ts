import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToPlain } from "class-transformer";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, bi, phone, county, city, province, country } = request.body;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      name,
      bi,
      phone,
      county,
      city,
      province,
      country,
      id,
    });

    return response.status(200).json(classToPlain(user));
  }
}

export { UpdateUserController };
