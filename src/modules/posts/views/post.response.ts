import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ description: 'Page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 8 })
  limit: number;
}

export class PaginationResponse<T> {
  @ApiPropertyOptional({
    description: 'Next page information',
    type: PaginationMeta,
  })
  next?: PaginationMeta;

  @ApiPropertyOptional({
    description: 'Previous page information',
    type: PaginationMeta,
  })
  previous?: PaginationMeta;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;

  @ApiProperty({ description: 'List of results', type: [Object] })
  results: T[];
}

export class PostResponse {
  @ApiProperty({ description: 'Post ID', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Post title',
    example: 'How to use NestJS with Swagger',
  })
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is the complete post content...',
  })
  content: string;

  @ApiProperty({ description: 'Author name', example: 'John Doe' })
  author: string;

  @ApiProperty({
    description: 'Post creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  date: Date;

  @ApiProperty({ description: 'Post category', example: 'Technology' })
  category: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag title',
    example: 'NestJS Swagger - Complete Guide',
  })
  meta_tag_title?: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag description',
    example: 'Learn how to integrate Swagger into your NestJS project',
  })
  meta_tag_description?: string;

  @ApiPropertyOptional({
    description: 'Post image URL',
    example: 'https://example.com/image.jpg',
  })
  post_image?: string;

  @ApiPropertyOptional({
    description: 'Post background image URL',
    example: 'https://example.com/background.jpg',
  })
  post_background?: string;

  @ApiPropertyOptional({
    description: 'SEO keywords',
    example: 'nestjs, swagger, api, documentation',
  })
  keywords?: string;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updated_at: Date;
}

export class PostPaginationResponse extends PaginationResponse<PostResponse> {
  @ApiProperty({ description: 'List of posts', type: [PostResponse] })
  results: PostResponse[];
}
