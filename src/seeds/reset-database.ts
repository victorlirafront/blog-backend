import { DataSource } from 'typeorm';
import { PostModel } from '../modules/posts/entities/post.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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
