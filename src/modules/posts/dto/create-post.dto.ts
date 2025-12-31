import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'How to use NestJS with Swagger',
    maxLength: 256,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Post content',
    example: 'This is the complete post content...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'Author name',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    description: 'Post category',
    example: 'Technology',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag title',
    example: 'NestJS Swagger - Complete Guide',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  meta_tag_title?: string;

  @ApiPropertyOptional({
    description: 'SEO meta tag description',
    example: 'Learn how to integrate Swagger into your NestJS project',
  })
  @IsString()
  @IsOptional()
  meta_tag_description?: string;

  @ApiPropertyOptional({
    description: 'Post image URL',
    example: 'https://example.com/image.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  post_image?: string;

  @ApiPropertyOptional({
    description: 'Post background image URL',
    example: 'https://example.com/background.jpg',
    maxLength: 255,
  })
  @IsString()
  @IsOptional()
  post_background?: string;

  @ApiPropertyOptional({
    description: 'SEO keywords',
    example: 'nestjs, swagger, api, documentation',
  })
  @IsString()
  @IsOptional()
  keywords?: string;
}
