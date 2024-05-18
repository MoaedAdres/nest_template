import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeNameToTitleMigration1715425243560 implements MigrationInterface {
    name = 'ChangeNameToTitleMigration1715425243560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" RENAME COLUMN "name" TO "title"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffe" RENAME COLUMN "title" TO "name"`);
    }

}
