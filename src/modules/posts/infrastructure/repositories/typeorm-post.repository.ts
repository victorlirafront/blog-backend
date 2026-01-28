import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { IPostRepository } from '../../domain/repositories/post.repository.interface';
import { Post } from '../../domain/entities/post.entity';
import { PostModel } from '../models/post.model';
import { CacheService } from '../../../../common/cache';
import {
  CACHE_KEYS,
  CACHE_TTL,
} from '../../../../common/cache/cache.constants';

@Injectable()
export class TypeOrmPostRepository implements IPostRepository {
  constructor(
    @InjectRepository(PostModel)
    private readonly postRepository: Repository<PostModel>,
    private readonly cacheService: CacheService,
  ) {}

  private toDomain(model: PostModel): Post {
    return new Post(
      model.id,
      model.title,
      model.content,
      model.author,
      model.slug,
      model.category,
      model.date,
      model.updated_at,
      model.meta_tag_title,
      model.meta_tag_description,
      model.post_image,
      model.post_background,
      model.keywords,
    );
  }

  private toModel(post: Post): Partial<PostModel> {
    return {
      title: post.title,
      content: post.content,
      author: post.author,
      slug: post.slug,
      category: post.category,
      meta_tag_title: post.meta_tag_title,
      meta_tag_description: post.meta_tag_description,
      post_image: post.post_image,
      post_background: post.post_background,
      keywords: post.keywords,
    };
  }

  async findAll(category?: string): Promise<Post[]> {
    const whereCondition = category && category !== 'all' ? { category } : {};
    const models = await this.postRepository.find({
      where: whereCondition,
      order: { updated_at: 'DESC', date: 'DESC' },
    });
    return models.map((model) => this.toDomain(model));
  }

  async findById(id: number): Promise<Post | null> {
    const cacheKey = CACHE_KEYS.POST_BY_ID(id);
    const cached = await this.cacheService.get<PostModel>(cacheKey);

    if (cached) {
      return this.toDomain(cached);
    }

    const model = await this.postRepository.findOne({ where: { id } });

    if (!model) {
      return null;
    }

    await this.cacheService.set(cacheKey, model, CACHE_TTL.MEDIUM);
    return this.toDomain(model);
  }

  async findBySlug(slug: string): Promise<Post | null> {
    const cacheKey = CACHE_KEYS.POST_BY_SLUG(slug);
    const cached = await this.cacheService.get<PostModel>(cacheKey);

    if (cached) {
      return this.toDomain(cached);
    }

    const model = await this.postRepository
      .createQueryBuilder('post')
      .where('post.slug = :slug', { slug })
      .getOne();

    if (!model) {
      return null;
    }

    await this.cacheService.set(cacheKey, model, CACHE_TTL.MEDIUM);
    return this.toDomain(model);
  }

  async findByAuthor(author: string): Promise<Post[]> {
    const cacheKey = CACHE_KEYS.POSTS_BY_AUTHOR(author);
    const cached = await this.cacheService.get<PostModel[]>(cacheKey);

    if (cached) {
      return cached.map((model) => this.toDomain(model));
    }

    const models = await this.postRepository.find({
      where: { author },
      order: { date: 'DESC' },
    });

    await this.cacheService.set(cacheKey, models, CACHE_TTL.SHORT);
    return models.map((model) => this.toDomain(model));
  }

  async findByCategory(category: string): Promise<Post[]> {
    const cacheKey = CACHE_KEYS.POSTS_BY_CATEGORY(category);
    const cached = await this.cacheService.get<PostModel[]>(cacheKey);

    if (cached) {
      return cached.map((model) => this.toDomain(model));
    }

    const models = await this.postRepository.find({
      where: { category },
      order: { date: 'DESC' },
    });

    await this.cacheService.set(cacheKey, models, CACHE_TTL.SHORT);
    return models.map((model) => this.toDomain(model));
  }

  async search(searchTerm: string): Promise<Post[]> {
    const models = await this.postRepository.find({
      where: {
        title: Like(`%${searchTerm}%`),
      },
      order: { date: 'DESC' },
    });
    return models.map((model) => this.toDomain(model));
  }

  private async invalidatePostRelatedCache(
    id: number,
    slug: string,
    author?: string,
    category?: string,
  ): Promise<void> {
    await this.cacheService.invalidatePostCache(id, slug, author);
    await this.cacheService.invalidatePostsListCache();
    if (category) {
      await this.cacheService.del(CACHE_KEYS.POSTS_BY_CATEGORY(category));
    }
    if (author) {
      await this.cacheService.del(CACHE_KEYS.POSTS_BY_AUTHOR(author));
    }
  }

  async create(post: Post): Promise<Post> {
    const model = this.postRepository.create(this.toModel(post));
    const saved = await this.postRepository.save(model);

    await this.cacheService.invalidatePostsListCache();
    if (saved.author) {
      await this.cacheService.del(CACHE_KEYS.POSTS_BY_AUTHOR(saved.author));
    }
    if (saved.category) {
      await this.cacheService.del(CACHE_KEYS.POSTS_BY_CATEGORY(saved.category));
    }

    return this.toDomain(saved);
  }

  async update(id: number, data: Partial<Post>): Promise<void> {
    const updateData: Partial<PostModel> = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.meta_tag_title !== undefined)
      updateData.meta_tag_title = data.meta_tag_title;
    if (data.meta_tag_description !== undefined)
      updateData.meta_tag_description = data.meta_tag_description;
    if (data.post_image !== undefined) updateData.post_image = data.post_image;
    if (data.post_background !== undefined)
      updateData.post_background = data.post_background;
    if (data.keywords !== undefined) updateData.keywords = data.keywords;

    const result = await this.postRepository.update({ id }, updateData);

    if (result.affected === 0) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    const post = await this.postRepository.findOne({ where: { id } });
    if (post) {
      await this.invalidatePostRelatedCache(
        id,
        post.slug,
        post.author,
        post.category,
      );
    }
  }

  async delete(id: number): Promise<void> {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
    }

    await this.postRepository.delete({ id });

    await this.invalidatePostRelatedCache(
      id,
      post.slug,
      post.author,
      post.category,
    );
  }
}
