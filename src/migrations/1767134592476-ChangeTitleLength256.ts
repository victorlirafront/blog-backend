import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeTitleLength2561767134592476 implements MigrationInterface {
  name = 'ChangeTitleLength2561767134592476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` MODIFY COLUMN \`title\` varchar(256) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`posts\` MODIFY COLUMN \`title\` varchar(300) NOT NULL`,
    );
  }
}
