import { MigrationInterface, QueryRunner } from "typeorm";

export class TestMigration1716631343455 implements MigrationInterface {
    name = 'TestMigration1716631343455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" RENAME COLUMN "title" TO "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" RENAME COLUMN "name" TO "title"`);
    }

}
