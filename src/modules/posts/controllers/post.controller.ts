import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDto, UpdatePostDto, PaginationDto } from '../dto';
import { PaginationResponse, PostResponse } from '../views/post.response';

@Controller('get')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<PostResponse>> {
    return this.postService.findAll(paginationDto);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostResponse> {
    return this.postService.create(createPostDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    await this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postService.delete(id);
  }

  @Get('search')
  async search(@Query('q') searchTerm: string): Promise<PostResponse[]> {
    return this.postService.search(searchTerm);
  }

  @Get('author/:author')
  async findByAuthor(@Param('author') author: string): Promise<PostResponse[]> {
    return this.postService.findByAuthor(author);
  }

  @Get('category/:category')
  async findByCategory(
    @Param('category') category: string,
  ): Promise<PostResponse[]> {
    return this.postService.findByCategory(category);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<PostResponse> {
    return this.postService.findById(id);
  }
}
