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
