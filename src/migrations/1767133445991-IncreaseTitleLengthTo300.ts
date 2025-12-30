import { MigrationInterface, QueryRunner } from 'typeorm';

export class IncreaseTitleLengthTo3001767133445991
  implements MigrationInterface
{
  name = 'IncreaseTitleLengthTo3001767133445991';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` MODIFY COLUMN \`title\` varchar(300) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` MODIFY COLUMN \`title\` varchar(255) NOT NULL`,
    );
  }
}
