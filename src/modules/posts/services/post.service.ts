import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  Inject,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CreatePostDto, UpdatePostDto, PaginationDto } from '../dto';
import { PaginationResponse, PostResponse } from '../views/post.response';
import { PostModel } from '../entities/post.entity';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

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
    try {
      const { page = 1, limit = 8, category } = paginationDto;
      const cacheKey = `posts:${category || 'all'}:page:${page}:limit:${limit}`;

      try {
        const cachedData =
          await this.cacheManager.get<PaginationResponse<PostResponse>>(
            cacheKey,
          );

        if (cachedData) {
          return cachedData;
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao acessar cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      const whereCondition = category && category !== 'all' ? { category } : {};

      const posts = await this.postRepository.find({
        where: whereCondition,
        order: { updated_at: 'DESC', date: 'DESC' },
      });

      const result = this.paginate(posts, page, limit);

      try {
        await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao salvar no cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        'Erro ao buscar posts',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao buscar posts');
    }
  }

  async create(createPostDto: CreatePostDto): Promise<PostResponse> {
    try {
      const newPost = this.postRepository.create(createPostDto);
      const savedPost = await this.postRepository.save(newPost);

      // Nota: Cache expirará naturalmente pelo TTL
      // Invalidar apenas chaves específicas se necessário

      return savedPost;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        'Erro ao criar post',
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao criar post');
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<void> {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('ID do post inválido');
      }

      if (Object.keys(updatePostDto).length === 0) {
        throw new BadRequestException(
          'Nenhum campo para atualizar foi fornecido',
        );
      }

      const result = await this.postRepository.update({ id }, updatePostDto);

      if (result.affected === 0) {
        throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
      }

      // Invalidar cache relacionado
      try {
        const post = await this.postRepository.findOne({ where: { id } });
        if (post) {
          await this.cacheManager.del(`post:id:${id}`);
          await this.cacheManager.del(`post:slug:${post.slug}`);
          // Nota: Cache de listagens expirará naturalmente pelo TTL
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao invalidar cache para post ID ${id}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Erro ao atualizar post ID ${id}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao atualizar post');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('ID do post inválido');
      }

      // Buscar post antes de deletar para invalidar cache
      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
      }

      const result = await this.postRepository.delete({ id });

      if (result.affected === 0) {
        throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
      }

      // Invalidar cache relacionado
      try {
        await this.cacheManager.del(`post:id:${id}`);
        await this.cacheManager.del(`post:slug:${post.slug}`);
        if (post.author) {
          await this.cacheManager.del(`posts:author:${post.author}`);
        }
        // Nota: Cache de listagens expirará naturalmente pelo TTL
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao invalidar cache para post ID ${id}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
      }
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Erro ao deletar post ID ${id}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao deletar post');
    }
  }

  async search(searchTerm: string): Promise<PaginationResponse<PostResponse>> {
    try {
      if (!searchTerm || searchTerm.trim().length === 0) {
        throw new BadRequestException('Termo de busca não pode estar vazio');
      }

      if (searchTerm.trim().length < 2) {
        throw new BadRequestException(
          'Termo de busca deve ter pelo menos 2 caracteres',
        );
      }

      const posts = await this.postRepository.find({
        where: {
          title: Like(`%${searchTerm.trim()}%`),
        },
        order: { date: 'DESC' },
      });

      return {
        totalPages: posts.length > 0 ? 1 : 0,
        results: posts,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Erro ao buscar posts com termo "${searchTerm}"`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao buscar posts');
    }
  }

  async findById(id: number): Promise<PostResponse> {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('ID do post inválido');
      }

      const cacheKey = `post:id:${id}`;

      try {
        const cachedPost = await this.cacheManager.get<PostResponse>(cacheKey);

        if (cachedPost) {
          return cachedPost;
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao acessar cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      const post = await this.postRepository.findOne({ where: { id } });

      if (!post) {
        throw new NotFoundException(`Post com ID ${id} não foi encontrado.`);
      }

      try {
        await this.cacheManager.set(cacheKey, post, 600000); // 10 minutos
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao salvar no cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      return post;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Erro ao buscar post por ID ${id}`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao buscar post');
    }
  }

  async findByAuthor(
    author: string,
  ): Promise<PaginationResponse<PostResponse>> {
    try {
      if (!author || author.trim().length === 0) {
        throw new BadRequestException('Nome do autor não pode estar vazio');
      }

      const cacheKey = `posts:author:${author.trim()}`;

      try {
        const cachedData =
          await this.cacheManager.get<PaginationResponse<PostResponse>>(
            cacheKey,
          );

        if (cachedData) {
          return cachedData;
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao acessar cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      const posts = await this.postRepository.find({
        where: { author: author.trim() },
        order: { date: 'DESC' },
      });

      const result = {
        totalPages: posts.length > 0 ? 1 : 0,
        results: posts,
      };

      try {
        await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao salvar no cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Erro ao buscar posts por autor "${author}"`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao buscar posts por autor');
    }
  }

  async findByCategory(
    category: string,
  ): Promise<PaginationResponse<PostResponse>> {
    try {
      if (!category || category.trim().length === 0) {
        throw new BadRequestException('Categoria não pode estar vazia');
      }

      const cacheKey = `posts:category:${category.trim()}`;

      try {
        const cachedData =
          await this.cacheManager.get<PaginationResponse<PostResponse>>(
            cacheKey,
          );

        if (cachedData) {
          return cachedData;
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao acessar cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      const posts = await this.postRepository.find({
        where: { category: category.trim() },
        order: { date: 'DESC' },
      });

      const result = {
        totalPages: posts.length > 0 ? 1 : 0,
        results: posts,
      };

      try {
        await this.cacheManager.set(cacheKey, result, 300000); // 5 minutos
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao salvar no cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Erro ao buscar posts por categoria "${category}"`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException(
        'Erro ao buscar posts por categoria',
      );
    }
  }

  async findBySlug(slug: string): Promise<PostResponse> {
    try {
      if (!slug || slug.trim().length === 0) {
        throw new BadRequestException('Slug não pode estar vazio');
      }

      const cacheKey = `post:slug:${slug.trim()}`;

      try {
        const cachedPost = await this.cacheManager.get<PostResponse>(cacheKey);

        if (cachedPost) {
          return cachedPost;
        }
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao acessar cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      const post = await this.postRepository
        .createQueryBuilder('post')
        .where('post.slug = :slug', { slug: slug.trim() })
        .getOne();

      if (!post) {
        throw new NotFoundException(
          `Post com slug "${slug}" não foi encontrado.`,
        );
      }

      try {
        await this.cacheManager.set(cacheKey, post, 600000); // 10 minutos
      } catch (cacheError) {
        this.logger.warn(
          `Erro ao salvar no cache para chave ${cacheKey}`,
          cacheError instanceof Error ? cacheError.stack : String(cacheError),
        );
        // Continua sem cache
      }

      return post;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      this.logger.error(
        `Erro ao buscar post por slug "${slug}"`,
        error instanceof Error ? error.stack : String(error),
      );
      throw new InternalServerErrorException('Erro ao buscar post por slug');
    }
  }
}
