import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreatePostDto, UpdatePostDto, PaginationDto } from '../dto';
import { PaginationResponse, PostResponse } from '../views/post.response';
import { PostModel } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel) private postRepository: Repository<PostModel>,
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

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<PostResponse>> {
    const { page = 1, limit = 8 } = paginationDto;

    const posts = await this.postRepository.find({
      order: { date: 'DESC' },
    });

    return this.paginate(posts, page, limit);
  }

  async create(createPostDto: CreatePostDto): Promise<PostResponse> {
    const newPost = this.postRepository.create(createPostDto);
    return this.postRepository.save(newPost);
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    const result = await this.postRepository.update({ id }, updatePostDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }
  }

  async delete(id: number): Promise<void> {
    const result = await this.postRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }
  }

  async search(searchTerm: string): Promise<PaginationResponse<PostResponse>> {
    const posts = await this.postRepository.find({
      where: {
        title: Like(`%${searchTerm}%`),
      },
      order: { date: 'DESC' },
    });

    // Retorna todos os resultados encontrados
    return {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };
  }

  async findById(id: number): Promise<PostResponse> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    return post;
  }

  async findByAuthor(
    author: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const posts = await this.postRepository.find({
      where: { author },
      order: { date: 'DESC' },
    });

    // Retorna todos os resultados encontrados do autor
    return {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };
  }

  async findByCategory(
    category: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const posts = await this.postRepository.find({
      where: { category },
      order: { date: 'DESC' },
    });

    // Retorna todos os resultados encontrados na categoria
    return {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };
  }
}
