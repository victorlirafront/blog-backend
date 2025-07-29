import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogPost } from '../typeorm/entities/BlogPost';
import { PostsController } from './controllers/users/users.controller';
import { PostsService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class UsersModule {}
