import { Injectable, Inject } from '@nestjs/common';
import {
  IPostRepository,
  POST_REPOSITORY_TOKEN,
} from '../../domain/repositories/post.repository.interface';
import { CreatePostDto } from '../dto/create-post.dto';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class CreatePostUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(dto: CreatePostDto): Promise<Post> {
    return await this.postRepository.create(dto.post);
  }
}
