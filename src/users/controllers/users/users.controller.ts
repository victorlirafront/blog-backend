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
import { BlogPost } from 'src/typeorm/entities/BlogPost';
import { CreatePostDto } from 'src/users/dtos/CreatePost.dto';
import { UpdatePostDto } from 'src/users/dtos/UpdatePost.dto';
import { PostsService } from 'src/users/services/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getPosts() {
    const posts = await this.postsService.findPosts();
    return posts;
  }

  @Get('published')
  async getPublishedPosts() {
    const posts = await this.postsService.findPublishedPosts();
    return posts;
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Put(':id')
  async updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async deletePostById(@Param('id', ParseIntPipe) id: number) {
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

  @Get('tags/:tags')
  async findPostsByTags(@Param('tags') tags: string): Promise<BlogPost[]> {
    return this.postsService.findByTags(tags);
  }

  @Get(':id')
  async findPostById(@Param('id') id: number): Promise<BlogPost> {
    return this.postsService.findById(id);
  }
}
