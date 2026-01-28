import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './presentation/controllers/post.controller';
import { PostMapper } from './presentation/mappers/post.mapper';
import { CreatePostUseCase } from './application/use-cases/create-post.use-case';
import { UpdatePostUseCase } from './application/use-cases/update-post.use-case';
import { DeletePostUseCase } from './application/use-cases/delete-post.use-case';
import { FindAllPostsUseCase } from './application/use-cases/find-all-posts.use-case';
import { FindPostByIdUseCase } from './application/use-cases/find-post-by-id.use-case';
import { FindPostBySlugUseCase } from './application/use-cases/find-post-by-slug.use-case';
import { FindPostsByAuthorUseCase } from './application/use-cases/find-posts-by-author.use-case';
import { FindPostsByCategoryUseCase } from './application/use-cases/find-posts-by-category.use-case';
import { SearchPostsUseCase } from './application/use-cases/search-posts.use-case';
import { PaginationService } from './application/services/pagination.service';
import { TypeOrmPostRepository } from './infrastructure/repositories/typeorm-post.repository';
import { POST_REPOSITORY_TOKEN } from './domain/repositories/post.repository.interface';
import { PostModel } from './infrastructure/models/post.model';
import { CacheService } from '../../common/cache';

const PostRepositoryProvider = {
  provide: POST_REPOSITORY_TOKEN,
  useClass: TypeOrmPostRepository,
};

@Module({
  imports: [TypeOrmModule.forFeature([PostModel])],
  controllers: [PostController],
  providers: [
    PostMapper,
    PaginationService,
    CreatePostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    FindAllPostsUseCase,
    FindPostByIdUseCase,
    FindPostBySlugUseCase,
    FindPostsByAuthorUseCase,
    FindPostsByCategoryUseCase,
    SearchPostsUseCase,
    PostRepositoryProvider,
    TypeOrmPostRepository,
    CacheService,
  ],
  exports: [CreatePostUseCase],
})
export class PostsModule {}
