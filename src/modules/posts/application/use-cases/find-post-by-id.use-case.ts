import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IPostRepository,
  POST_REPOSITORY_TOKEN,
} from '../../domain/repositories/post.repository.interface';
import { Post } from '../../domain/entities/post.entity';

@Injectable()
export class FindPostByIdUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(id: number): Promise<Post> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    return post;
  }
}
