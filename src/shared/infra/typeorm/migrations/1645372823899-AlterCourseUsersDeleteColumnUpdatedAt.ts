import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCourseUsersDeleteColumnUpdatedAt1645372823899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("courses_users", "updated_at");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "courses_users",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "now()",
      })
    );
  }
}
