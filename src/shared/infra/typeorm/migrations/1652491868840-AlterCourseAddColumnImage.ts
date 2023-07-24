import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterCourseAddColumnImage1652491868840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "courses",
            new TableColumn({
                name: "image",
                type: "varchar",
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("courses")
    }

}
