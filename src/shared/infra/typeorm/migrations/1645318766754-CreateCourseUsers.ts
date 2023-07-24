import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCourseUsers1645318766754 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "courses_users",
        columns: [
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "course_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "courses_users",
      new TableForeignKey({
        name: "FKUsersCourses",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );

    await queryRunner.createForeignKey(
      "courses_users",
      new TableForeignKey({
        name: "FKCoursesUsers",
        referencedTableName: "courses",
        referencedColumnNames: ["id"],
        columnNames: ["course_id"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("courses_users", "FKUsersCourses");
    await queryRunner.dropForeignKey("courses_users", "FKCoursesUsers");
    await queryRunner.dropTable("courses_users");
  }
}
