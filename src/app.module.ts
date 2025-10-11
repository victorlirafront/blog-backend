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
      synchronize: process.env.NODE_ENV !== 'production', //nunca deixe como true, isso afetara as tabelas do banco em prod, estudar isso depois
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
          ttl: 300, // 5 minutos padrão
        });

        return { store };
      },
    }),
    PostsModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
