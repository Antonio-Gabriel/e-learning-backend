import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCoursesUsersAddColumnIsRelations1645392790879
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "courses_users",
      new TableColumn({
        name: "isRelations",
        type: "boolean",
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("courses_users");
  }
}
