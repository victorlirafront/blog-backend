import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogPost } from 'src/entities/BlogPost';
import { Like, Repository } from 'typeorm';
import { CreatePostParams, UpdatePostParams } from '../../../types/post';
import { PaginationDto } from '../../dtos/Pagination.dto';
import { PaginationResponse } from '../../types/pagination.types';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(BlogPost) private postRepository: Repository<BlogPost>,
  ) {}

  private paginate<T>(data: T[], page = 1, limit = 8): PaginationResponse<T> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: PaginationResponse<T> = {
      results: [],
      totalPages: Math.ceil(data.length / limit),
    };

    if (endIndex < data.length) {
      results.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit };
    }

    results.results = [...data].slice(startIndex, endIndex);

    return results;
  }

  async findPosts(paginationDto: PaginationDto): Promise<PaginationResponse<BlogPost>> {
    const { page = 1, limit = 8 } = paginationDto;
    
    const posts = await this.postRepository.find({
      order: { date: 'DESC' },
    });

    return this.paginate(posts, page, limit);
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
