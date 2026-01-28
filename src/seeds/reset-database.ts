import { DataSource } from 'typeorm';
import { PostModel } from '../modules/posts/infrastructure/models/post.model';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.BLOG_HOST || 'localhost',
  port: Number(process.env.BLOG_DB_PORT) || 3306,
  username: process.env.BLOG_USERNAME || 'root',
  password: process.env.BLOG_PASSWORD || '',
  database: process.env.BLOG_DATABASE || 'blog_db',
  entities: [PostModel],
  synchronize: false,
});

async function resetDatabase() {
  try {
    await dataSource.initialize();

    // Drop e recriar tabela
    await dataSource.dropDatabase();
    await dataSource.synchronize();

    console.log('✅ Banco de dados resetado com sucesso!');

    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Erro ao resetar banco:', error);
    process.exit(1);
  }
}

resetDatabase();
