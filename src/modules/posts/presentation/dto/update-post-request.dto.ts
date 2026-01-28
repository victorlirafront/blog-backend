import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePostRequestDto {
  @ApiPropertyOptional({
    description: 'Post title',
    example: 'How to use NestJS with Swagger - Updated',
    maxLength: 256,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Post content',
    example: 'This is the updated post content...',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Author name',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiPropertyOptional({
    description: 'Post category',
    example: 'Technology',
    maxLength: 50,
  })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag title',
    example: 'NestJS Swagger - Complete Guide Updated',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  meta_tag_title?: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag description',
    example:
      'Learn how to integrate Swagger into your NestJS project - Updated version',
  })
  @IsString()
  @IsOptional()
  meta_tag_description?: string;

  @ApiPropertyOptional({
    description: 'Post image URL',
    example: 'https://example.com/image-updated.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  post_image?: string;

  @ApiPropertyOptional({
    description: 'Post background image URL',
    example: 'https://example.com/background-updated.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  post_background?: string;

  @ApiPropertyOptional({
    description: 'SEO keywords',
    example: 'nestjs, swagger, api, documentation, updated',
  })
  @IsString()
  @IsOptional()
  keywords?: string;
}
