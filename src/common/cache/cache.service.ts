import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_KEYS } from './cache.constants';

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    try {
      return await this.cacheManager.get<T>(key);
    } catch (error) {
      this.logger.warn(
        `Erro ao acessar cache para chave ${key}`,
        error instanceof Error ? error.stack : String(error),
      );
      return undefined;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttl);
    } catch (error) {
      this.logger.warn(
        `Erro ao salvar no cache para chave ${key}`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      this.logger.warn(
        `Erro ao deletar cache para chave ${key}`,
        error instanceof Error ? error.stack : String(error),
      );
    }
  }

  async invalidatePostCache(
    postId?: number,
    slug?: string,
    author?: string,
  ): Promise<void> {
    const promises: Promise<void>[] = [];

    if (postId) {
      promises.push(this.del(CACHE_KEYS.POST_BY_ID(postId)));
    }

    if (slug) {
      promises.push(this.del(CACHE_KEYS.POST_BY_SLUG(slug)));
    }

    if (author) {
      promises.push(this.del(CACHE_KEYS.POSTS_BY_AUTHOR(author)));
    }

    await Promise.all(promises);
  }

  async invalidatePostsListCache(): Promise<void> {
    try {
      const store = (this.cacheManager as any).store;
      if (store && typeof store.keys === 'function') {
        const keys = await store.keys('posts:*');
        if (keys && Array.isArray(keys)) {
          await Promise.all(keys.map((key: string) => this.del(key)));
        }
      }
    } catch (error) {
      this.logger.warn('Erro ao invalidar cache de listagens', error);
    }
  }
}
