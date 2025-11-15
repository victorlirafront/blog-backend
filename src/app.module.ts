import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { EmailModule } from './modules/email/email.module';
import { PostModel } from './modules/posts/entities/post.entity';
import * as dotenv from 'dotenv';
import { redisStore } from 'cache-manager-redis-store';

dotenv.config();

const _dirname = __dirname;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.BLOG_HOST,
      port: Number(process.env.BLOG_DB_PORT),
      username: process.env.BLOG_USERNAME,
      password: process.env.BLOG_PASSWORD,
      database: process.env.BLOG_DATABASE,
      entities: [PostModel],
      migrations: [`${_dirname}/migrations/*.js`],
      migrationsRun: false,
      synchronize: false,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        try {
          console.log('🔄 Configurando Redis...');
          const store = await redisStore({
            socket: {
              host: process.env.REDIS_HOST || 'localhost',
              port: Number(process.env.REDIS_PORT) || 6379,
            },
            ttl: 300, // 5 minutos padrão
          });
          console.log('✅ Redis configurado com sucesso!');
          return { store };
        } catch (error) {
          console.error('❌ Erro ao conectar Redis:', error.message);
          console.log('⚠️  Usando cache em memória como fallback');
          return {}; // Fallback para cache em memória
        }
      },
    }),
    PostsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
