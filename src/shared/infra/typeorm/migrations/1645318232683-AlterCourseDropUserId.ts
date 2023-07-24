import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCourseDropUserId1645318232683 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("courses", "user_id");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "courses",
      new TableColumn({
        name: "user_id",
        type: "uuid",
        isNullable: true,
      })
    );
  }
}
