import { Injectable, Inject } from '@nestjs/common';
import {
  IPostRepository,
  POST_REPOSITORY_TOKEN,
} from '../../domain/repositories/post.repository.interface';
import { PaginationDto } from '../dto/pagination.dto';
import {
  PaginationService,
  PaginationResult,
} from '../services/pagination.service';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class FindAllPostsUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async execute(dto: PaginationDto): Promise<PaginationResult<Post>> {
    const posts = await this.postRepository.findAll(dto.category);
    return this.paginationService.paginate(posts, dto.page, dto.limit);
  }
}
