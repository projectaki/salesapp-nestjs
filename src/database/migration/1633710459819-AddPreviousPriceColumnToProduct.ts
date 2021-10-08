import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPreviousPriceColumnToProduct1633710459819
  implements MigrationInterface
{
  name = 'AddPreviousPriceColumnToProduct1633710459819';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "previous_price" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "previous_price"`,
    );
  }
}
