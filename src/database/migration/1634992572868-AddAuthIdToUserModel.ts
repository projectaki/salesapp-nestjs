import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuthIdToUserModel1634992572868 implements MigrationInterface {
  name = 'AddAuthIdToUserModel1634992572868';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "authId" character varying(100) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "authId"`);
  }
}
