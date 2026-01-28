import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { EmailModule } from './modules/email/email.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { PostModel } from './modules/posts/infrastructure/models/post.model';
import {
  LoggerMiddleware,
  RequestIdMiddleware,
  RateLimitMiddleware,
} from './common/middleware';

const _dirname = __dirname;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('BLOG_HOST'),
        port: Number(config.get<string>('BLOG_DB_PORT')),
        username: config.get<string>('BLOG_USERNAME'),
        password: config.get<string>('BLOG_PASSWORD'),
        database: config.get<string>('BLOG_DATABASE'),
        entities: [PostModel],
        migrations: [`${_dirname}/migrations/*.js`],
        migrationsRun: false,
        synchronize: false,
      }),
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        try {
          console.log('🔄 Configurando Redis...');
          const store = await redisStore({
            socket: {
              host: config.get<string>('REDIS_HOST') || 'localhost',
              port: Number(config.get<string>('REDIS_PORT')) || 6379,
            },
            ttl: 300000,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestIdMiddleware, LoggerMiddleware, RateLimitMiddleware)
      .forRoutes('*'); // Aplica a todas as rotas
  }
}
