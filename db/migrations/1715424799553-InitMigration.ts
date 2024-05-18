import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1715424799553 implements MigrationInterface {
    name = 'InitMigration1715424799553'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e1de41532ad6af403d3ceb4f2" ON "event" ("name", "type") `);
        await queryRunner.query(`CREATE TABLE "coffe" ("id" SERIAL NOT NULL, "name" character varying, "brand" character varying NOT NULL, "recomendation" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_599f9853f5597097c02766e664c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "flavor" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_934fe79b3d8131395c29a040ee5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coffes_flavors" ("coffeId" integer NOT NULL, "flavorId" integer NOT NULL, CONSTRAINT "PK_5483ae667c55b87f794eeb181ba" PRIMARY KEY ("coffeId", "flavorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b152d23eeb1a90a8c6c1cdbe0a" ON "coffes_flavors" ("coffeId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dcc1881a98033f5a5697dac451" ON "coffes_flavors" ("flavorId") `);
        await queryRunner.query(`ALTER TABLE "coffes_flavors" ADD CONSTRAINT "FK_b152d23eeb1a90a8c6c1cdbe0a7" FOREIGN KEY ("coffeId") REFERENCES "coffe"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coffes_flavors" ADD CONSTRAINT "FK_dcc1881a98033f5a5697dac4513" FOREIGN KEY ("flavorId") REFERENCES "flavor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffes_flavors" DROP CONSTRAINT "FK_dcc1881a98033f5a5697dac4513"`);
        await queryRunner.query(`ALTER TABLE "coffes_flavors" DROP CONSTRAINT "FK_b152d23eeb1a90a8c6c1cdbe0a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dcc1881a98033f5a5697dac451"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b152d23eeb1a90a8c6c1cdbe0a"`);
        await queryRunner.query(`DROP TABLE "coffes_flavors"`);
        await queryRunner.query(`DROP TABLE "flavor"`);
        await queryRunner.query(`DROP TABLE "coffe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e1de41532ad6af403d3ceb4f2"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }

}
