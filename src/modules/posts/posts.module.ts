import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostService } from './models/post.service';
import { PostModel } from './models/post.model';

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostsModule {} 