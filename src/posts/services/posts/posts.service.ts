import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from 'src/entities/BlogPost';
import { Like, Repository } from 'typeorm';
import { CreatePostParams, UpdatePostParams } from '../../../types/post';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost) private postRepository: Repository<BlogPost>,
  ) {}

  findPosts() {
    return this.postRepository.find();
  }

  createPost(postDetails: CreatePostParams) {
    const newPost = this.postRepository.create({
      ...postDetails,
    });

    return this.postRepository.save(newPost);
  }

  updatePost(id: number, updatePostDetails: UpdatePostParams) {
    return this.postRepository.update({ id }, { ...updatePostDetails });
  }

  deletePost(id: number) {
    return this.postRepository.delete({ id });
  }

  async searchPosts(searchTerm: string): Promise<BlogPost[]> {
    return this.postRepository.find({
      where: [
        { title: Like(`%${searchTerm}%`) },
        { content: Like(`%${searchTerm}%`) },
        { author: Like(`%${searchTerm}%`) },
        { category: Like(`%${searchTerm}%`) },
        { meta_tag_title: Like(`%${searchTerm}%`) },
        { meta_tag_description: Like(`%${searchTerm}%`) },
      ],
    });
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

  async findByCategory(category: string): Promise<BlogPost[]> {
    return this.postRepository.find({ where: { category } });
  }
}
