import { Post } from '../entities/post.entity';

export const POST_REPOSITORY_TOKEN = Symbol('IPostRepository');

export interface IPostRepository {
  findAll(category?: string): Promise<Post[]>;
  findById(id: number): Promise<Post | null>;
  findBySlug(slug: string): Promise<Post | null>;
  findByAuthor(author: string): Promise<Post[]>;
  findByCategory(category: string): Promise<Post[]>;
  search(searchTerm: string): Promise<Post[]>;
  create(post: Post): Promise<Post>;
  update(id: number, post: Partial<Post>): Promise<void>;
  delete(id: number): Promise<void>;
}
