import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Version,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CreatePostUseCase } from '../../application/use-cases/create-post.use-case';
import { UpdatePostUseCase } from '../../application/use-cases/update-post.use-case';
import { DeletePostUseCase } from '../../application/use-cases/delete-post.use-case';
import { FindAllPostsUseCase } from '../../application/use-cases/find-all-posts.use-case';
import { FindPostByIdUseCase } from '../../application/use-cases/find-post-by-id.use-case';
import { FindPostBySlugUseCase } from '../../application/use-cases/find-post-by-slug.use-case';
import { FindPostsByAuthorUseCase } from '../../application/use-cases/find-posts-by-author.use-case';
import { FindPostsByCategoryUseCase } from '../../application/use-cases/find-posts-by-category.use-case';
import { SearchPostsUseCase } from '../../application/use-cases/search-posts.use-case';
import { PostMapper } from '../mappers/post.mapper';
import { CreatePostRequestDto } from '../dto/create-post-request.dto';
import { UpdatePostRequestDto } from '../dto/update-post-request.dto';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import {
  PaginationResponse,
  PostResponse,
  PostPaginationResponse,
} from '../views/post.response';

@ApiTags('posts')
@Controller({ path: 'get', version: '1' })
export class PostController {
  constructor(
    private readonly createPostUseCase: CreatePostUseCase,
    private readonly updatePostUseCase: UpdatePostUseCase,
    private readonly deletePostUseCase: DeletePostUseCase,
    private readonly findAllPostsUseCase: FindAllPostsUseCase,
    private readonly findPostByIdUseCase: FindPostByIdUseCase,
    private readonly findPostBySlugUseCase: FindPostBySlugUseCase,
    private readonly findPostsByAuthorUseCase: FindPostsByAuthorUseCase,
    private readonly findPostsByCategoryUseCase: FindPostsByCategoryUseCase,
    private readonly searchPostsUseCase: SearchPostsUseCase,
    private readonly postMapper: PostMapper,
  ) {}

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'List all posts',
    description:
      'Returns a paginated list of posts. Allows filtering by category.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of posts returned successfully',
    type: PostPaginationResponse,
  })
  async findAll(
    @Query() paginationDto: PaginationRequestDto,
  ): Promise<PaginationResponse<PostResponse>> {
    const dto = this.postMapper.toPaginationDto(paginationDto);
    const result = await this.findAllPostsUseCase.execute(dto);
    return {
      ...result,
      results: result.results.map((post) => PostResponse.fromDomain(post)),
    };
  }

  @Post()
  @Version('1')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new post',
    description: 'Creates a new blog post with the provided data.',
  })
  @ApiResponse({
    status: 201,
    description: 'Post created successfully',
    type: PostResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async create(
    @Body() createPostDto: CreatePostRequestDto,
  ): Promise<PostResponse> {
    const dto = this.postMapper.toCreatePostDto(createPostDto);
    const post = await this.createPostUseCase.execute(dto);
    return PostResponse.fromDomain(post);
  }

  @Put(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Update a post',
    description: 'Updates an existing post by ID. All fields are optional.',
  })
  @ApiParam({ name: 'id', description: 'Post ID to update', example: 1 })
  @ApiResponse({
    status: 204,
    description: 'Post updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostRequestDto,
  ): Promise<void> {
    const dto = this.postMapper.toUpdatePostDto(id, updatePostDto);
    await this.updatePostUseCase.execute(dto);
  }

  @Delete(':id')
  @Version('1')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a post',
    description: 'Removes a post from the database by ID.',
  })
  @ApiParam({ name: 'id', description: 'Post ID to delete', example: 1 })
  @ApiResponse({
    status: 204,
    description: 'Post deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.deletePostUseCase.execute(id);
  }

  @Get('search')
  @Version('1')
  @ApiOperation({
    summary: 'Search posts',
    description: 'Searches for posts by term in title and content.',
  })
  @ApiQuery({ name: 'query', description: 'Search term', example: 'nestjs' })
  @ApiResponse({
    status: 200,
    description: 'Search results returned successfully',
    type: PostPaginationResponse,
  })
  async search(
    @Query('query') searchTerm: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const result = await this.searchPostsUseCase.execute(searchTerm);
    return {
      ...result,
      results: result.results.map((post) => PostResponse.fromDomain(post)),
    };
  }

  @Get('author/:author')
  @Version('1')
  @ApiOperation({
    summary: 'Get posts by author',
    description: 'Returns all posts from a specific author.',
  })
  @ApiParam({ name: 'author', description: 'Author name', example: 'John Doe' })
  @ApiResponse({
    status: 200,
    description: 'Author posts returned successfully',
    type: PostPaginationResponse,
  })
  async findByAuthor(
    @Param('author') author: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const result = await this.findPostsByAuthorUseCase.execute(author);
    return {
      ...result,
      results: result.results.map((post) => PostResponse.fromDomain(post)),
    };
  }

  @Get('category/:category')
  @Version('1')
  @ApiOperation({
    summary: 'Get posts by category',
    description: 'Returns all posts from a specific category.',
  })
  @ApiParam({
    name: 'category',
    description: 'Category name',
    example: 'Technology',
  })
  @ApiResponse({
    status: 200,
    description: 'Category posts returned successfully',
    type: PostPaginationResponse,
  })
  async findByCategory(
    @Param('category') category: string,
  ): Promise<PaginationResponse<PostResponse>> {
    const result = await this.findPostsByCategoryUseCase.execute(category);
    return {
      ...result,
      results: result.results.map((post) => PostResponse.fromDomain(post)),
    };
  }

  @Get('slug/:slug')
  @Version('1')
  @ApiOperation({
    summary: 'Get post by slug',
    description:
      'Returns a specific post by its slug (URL-friendly identifier).',
  })
  @ApiParam({
    name: 'slug',
    description: 'Post slug',
    example: 'how-to-use-nestjs-with-swagger',
  })
  @ApiResponse({
    status: 200,
    description: 'Post returned successfully',
    type: PostResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  async findBySlug(@Param('slug') slug: string): Promise<PostResponse> {
    const post = await this.findPostBySlugUseCase.execute(slug);
    return PostResponse.fromDomain(post);
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({
    summary: 'Get post by ID',
    description: 'Returns a specific post by its ID.',
  })
  @ApiParam({ name: 'id', description: 'Post ID', example: 1, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Post returned successfully',
    type: PostResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Post not found',
  })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<PostResponse> {
    const post = await this.findPostByIdUseCase.execute(id);
    return PostResponse.fromDomain(post);
  }
}
