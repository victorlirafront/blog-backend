import { DataSource } from 'typeorm';
import { PostModel } from './modules/posts/entities/post.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.BLOG_HOST || 'localhost',
  port: Number(process.env.BLOG_DB_PORT) || 3306,
  username: process.env.BLOG_USERNAME || 'root',
  password: process.env.BLOG_PASSWORD || '',
  database: process.env.BLOG_DATABASE || 'blog_db',
  entities: [PostModel],
  migrations: ['dist/migrations/**/*.js'],
  migrationsTableName: 'migrations',
  synchronize: false,
});
