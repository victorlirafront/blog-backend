import { Injectable, Inject } from '@nestjs/common';
import {
  IPostRepository,
  POST_REPOSITORY_TOKEN,
} from '../../domain/repositories/post.repository.interface';
import {
  PaginationService,
  PaginationResult,
} from '../services/pagination.service';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class FindPostsByCategoryUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(category: string): Promise<PaginationResult<Post>> {
    const posts = await this.postRepository.findByCategory(category);
    return this.paginationService.paginate(posts, 1, posts.length || 1);
  }
}
