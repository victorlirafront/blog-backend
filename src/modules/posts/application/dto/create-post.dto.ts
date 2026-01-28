import { Post } from '../../domain/entities/post.entity';

export class CreatePostDto {
  constructor(public readonly post: Post) {}
}
