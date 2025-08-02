import { DataSource } from 'typeorm';
import { PostModel } from '../modules/posts/models/post.model';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
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
