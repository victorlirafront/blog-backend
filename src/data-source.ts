import { DataSource } from 'typeorm';
import { PostModel } from './modules/posts/infrastructure/models/post.model';
import * as dotenv from 'dotenv';

dotenv.config();

const isProduction =
  process.env.NODE_ENV === 'production' || __dirname.includes('dist');

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.BLOG_HOST || 'localhost',
  port: Number(process.env.BLOG_DB_PORT) || 3306,
  username: process.env.BLOG_USERNAME || 'root',
  password: process.env.BLOG_PASSWORD || '',
  database: process.env.BLOG_DATABASE || 'blog_db',
  entities: [PostModel],
  migrations: isProduction
    ? ['dist/migrations/**/*.js']
    : ['src/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
});
