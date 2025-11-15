import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePostsTable1734342536000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'posts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'content',
            type: 'text',
          },
          {
            name: 'author',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isUnique: true,
          },
          {
            name: 'date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'category',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'meta_tag_title',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'meta_tag_description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'post_image',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'post_background',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          {
            name: 'keywords',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('posts');
  }
}
