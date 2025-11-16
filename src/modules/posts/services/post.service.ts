import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreatePostDto, UpdatePostDto, PaginationDto } from '../dto';
import { PaginationResponse, PostResponse } from '../views/post.response';
import { PostModel } from '../entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostModel) private postRepository: Repository<PostModel>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
    const { page = 1, limit = 8, category } = paginationDto;
    const cacheKey = `posts:${category || 'all'}:page:${page}:limit:${limit}`;

    const cachedData =
      await this.cacheManager.get<PaginationResponse<PostResponse>>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const whereCondition = category && category !== 'all' ? { category } : {};

    const posts = await this.postRepository.find({
      where: whereCondition,
      order: { updated_at: 'DESC', date: 'DESC' },
    });

    const result = this.paginate(posts, page, limit);

    await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos

    return result;
  }

  async create(createPostDto: CreatePostDto): Promise<PostResponse> {
    const newPost = this.postRepository.create(createPostDto);
    const savedPost = await this.postRepository.save(newPost);
    return savedPost;
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

    return {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };
  }

  async findById(id: number): Promise<PostResponse> {
    const cacheKey = `post:id:${id}`;

    const cachedPost = await this.cacheManager.get<PostResponse>(cacheKey);

    if (cachedPost) {
      return cachedPost;
    }

    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    await this.cacheManager.set(cacheKey, post, 600000); // 10 minutos

    return post;
  }

  async findByAuthor(
    author: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const cacheKey = `posts:author:${author}`;

    const cachedData =
      await this.cacheManager.get<PaginationResponse<PostResponse>>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const posts = await this.postRepository.find({
      where: { author },
      order: { date: 'DESC' },
    });

    const result = {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };

    await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos

    return result;
  }

  async findByCategory(
    category: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const cacheKey = `posts:category:${category}`;

    const cachedData =
      await this.cacheManager.get<PaginationResponse<PostResponse>>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const posts = await this.postRepository.find({
      where: { category },
      order: { date: 'DESC' },
    });

    const result = {
      totalPages: posts.length > 0 ? 1 : 0,
      results: posts,
    };

    await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos

    return result;
  }

  async findBySlug(slug: string): Promise<PostResponse> {
    const cacheKey = `post:slug:${slug}`;

    const cachedPost = await this.cacheManager.get<PostResponse>(cacheKey);

    if (cachedPost) {
      return cachedPost;
    }

    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.slug = :slug', { slug })
      .getOne();

    if (!post) {
      throw new NotFoundException(
        `Post com slug "${slug}" não foi encontrado.`,
      );
    }

    await this.cacheManager.set(cacheKey, post, 600000); // 10 minutos

    return post;
  }
}
