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
import { CreatePostDto } from 'src/posts/dtos/CreatePost.dto';
import { UpdatePostDto } from 'src/posts/dtos/UpdatePost.dto';
import { PaginationDto } from 'src/posts/dtos/Pagination.dto';
import { PostsService } from 'src/posts/services/posts/posts.service';
import { BlogPost } from 'src/entities/BlogPost';
import { PaginationResponse } from 'src/posts/types/pagination.types';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<PaginationResponse<BlogPost>> {
    return this.postsService.findPosts(paginationDto);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto): Promise<BlogPost> {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<void> {
    await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async deletePostById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.postsService.deletePost(id);
  }

  @Get('search')
  async search(@Query('q') searchTerm: string): Promise<BlogPost[]> {
    return this.postsService.searchPosts(searchTerm);
  }

  @Get('author/:author')
  async findPostsByAuthor(
    @Param('author') author: string,
  ): Promise<BlogPost[]> {
    return this.postsService.findByAuthor(author);
  }

  @Get('category/:category')
  async findPostsByCategory(
    @Param('category') category: string,
  ): Promise<BlogPost[]> {
    return this.postsService.findByCategory(category);
  }

  @Get(':id')
  async findPostById(@Param('id', ParseIntPipe) id: number): Promise<BlogPost> {
    return this.postsService.findById(id);
  }
}
