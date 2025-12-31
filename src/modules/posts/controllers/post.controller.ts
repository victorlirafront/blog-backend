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
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto, PaginationDto } from '../dto';
import {
  PaginationResponse,
  PostResponse,
  PostPaginationResponse,
} from '../views/post.response';

@ApiTags('posts')
@Controller({ path: 'get', version: '1' })
export class PostController {
  constructor(private postService: PostService) {}

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
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<PostResponse>> {
    return this.postService.findAll(paginationDto);
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
  async create(@Body() createPostDto: CreatePostDto): Promise<PostResponse> {
    return this.postService.create(createPostDto);
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
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    await this.postService.update(id, updatePostDto);
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
    await this.postService.delete(id);
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
    return this.postService.search(searchTerm);
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
    return this.postService.findByAuthor(author);
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
    return this.postService.findByCategory(category);
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
    return this.postService.findBySlug(slug);
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
    return this.postService.findById(id);
  }
}
