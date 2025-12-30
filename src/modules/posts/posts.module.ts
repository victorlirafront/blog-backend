import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostModel } from './entities/post.entity';
import { CacheService } from '../../common/cache';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostController],
  providers: [PostService, CacheService],
  exports: [PostService],
})
export class PostsModule {}
