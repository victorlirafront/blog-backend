import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  meta_tag_title?: string;

  @IsString()
  @IsOptional()
  meta_tag_description?: string;

  @IsString()
  @IsOptional()
  post_image?: string;

  @IsString()
  @IsOptional()
  post_background?: string;

  @IsString()
  @IsOptional()
  keywords?: string;
}

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  meta_tag_title?: string;

  @IsString()
  @IsOptional()
  meta_tag_description?: string;

  @IsString()
  @IsOptional()
  post_image?: string;

  @IsString()
  @IsOptional()
  post_background?: string;

  @IsString()
  @IsOptional()
  keywords?: string;
}

export class PaginationDto {
  @IsOptional()
  page?: number = 1;

  @IsOptional()
  limit?: number = 8;
} 