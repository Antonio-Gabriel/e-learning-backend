import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterUserEmail1646762237407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD UNIQUE("email")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD UNIQUE("email")`);
  }
}
