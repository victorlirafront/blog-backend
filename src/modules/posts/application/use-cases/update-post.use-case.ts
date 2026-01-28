import { Injectable, Inject } from '@nestjs/common';
import {
  IPostRepository,
  POST_REPOSITORY_TOKEN,
} from '../../domain/repositories/post.repository.interface';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class UpdatePostUseCase {
  constructor(
    @Inject(POST_REPOSITORY_TOKEN)
    private readonly postRepository: IPostRepository,
  ) {}

  async execute(dto: UpdatePostDto): Promise<void> {
    await this.postRepository.update(dto.id, dto.data);
  }
}
