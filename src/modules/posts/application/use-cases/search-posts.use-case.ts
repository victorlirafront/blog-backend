import { Injectable, Inject, BadRequestException } from '@nestjs/common';
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
export class SearchPostsUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(searchTerm: string): Promise<PaginationResult<Post>> {
    if (!searchTerm || searchTerm.trim().length === 0) {
      throw new BadRequestException('Termo de busca não pode estar vazio');
    }

    if (searchTerm.trim().length < 2) {
      throw new BadRequestException(
        'Termo de busca deve ter pelo menos 2 caracteres',
      );
    }

    const posts = await this.postRepository.search(searchTerm.trim());
    return this.paginationService.paginate(posts, 1, posts.length || 1);
  }
}
