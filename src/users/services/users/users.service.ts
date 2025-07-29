import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from 'src/typeorm/entities/BlogPost';
import { Like, Repository } from 'typeorm';
import { CreatePostParams, UpdatePostParams } from '../../../utils/types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost) private postRepository: Repository<BlogPost>,
  ) {}

  findPosts() {
    return this.postRepository.find();
  }

  findPublishedPosts() {
    return this.postRepository.find({ where: { published: true } });
  }

  createPost(postDetails: CreatePostParams) {
    const newPost = this.postRepository.create({
      ...postDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return this.postRepository.save(newPost);
  }

  updatePost(id: number, updatePostDetails: UpdatePostParams) {
    return this.postRepository.update(
      { id },
      { ...updatePostDetails, updatedAt: new Date() },
    );
  }

  deletePost(id: number) {
    return this.postRepository.delete({ id });
  }

  async searchPosts(searchTerm: string): Promise<BlogPost[]> {
    const posts = await this.postRepository.find({
      where: [
        { title: Like(`%${searchTerm}%`) },
        { content: Like(`%${searchTerm}%`) },
        { author: Like(`%${searchTerm}%`) },
        { tags: Like(`%${searchTerm}%`) },
      ],
    });

    return posts;
  }

  async findById(id: number): Promise<BlogPost> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    return post;
  }

  async findByAuthor(author: string): Promise<BlogPost[]> {
    return this.postRepository.find({ where: { author } });
  }

  async findByTags(tags: string): Promise<BlogPost[]> {
    return this.postRepository.find({ where: { tags: Like(`%${tags}%`) } });
  }
}
