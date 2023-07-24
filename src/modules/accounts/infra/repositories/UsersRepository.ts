import { ICreateUsersDto } from "@modules/accounts/dtos/ICreateUsersDto";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { getRepository, Like, Repository } from "typeorm";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUsersDto): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne({ id });
  }

  async findAllUsers(): Promise<User[]> {
    const usersQuery = this.repository
      .createQueryBuilder("u")
      // .leftJoinAndSelect("u.courses", "courses")
      .loadRelationCountAndMap("u.totalOfCourses", "u.courses");

    const user = await usersQuery.getMany();

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email });
  }

  async findByBI(bi: string): Promise<User> {
    const user = await this.repository.findOne({ bi });

    return user;
  }

  async findByName(name: string): Promise<User[]> {
    const user = this.repository.find({
      name: Like(`%${name}%`),
    });

    return user;
  }

  async findAllPaginated(page: number): Promise<[User[], number]> {
    return await this.repository.findAndCount({
      skip: page,
      take: 10,
    });
  }

  async findByIdShowDetails(id: string): Promise<User> {
    const userQuery = this.repository
      .createQueryBuilder("u")
      .where("u.id = :id", { id });

    userQuery
      .orWhere("user_id = :id", { id })
      .leftJoinAndSelect("u.courses", "courses")
      .loadRelationCountAndMap("u.coursesCounts", "u.courses");

    const user = await userQuery.getMany();

    return user as any;
  }

  async save(user: User): Promise<User> {
    const users = await this.repository.save(user);

    return users;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete(id);
  }
}

export { UsersRepository };
