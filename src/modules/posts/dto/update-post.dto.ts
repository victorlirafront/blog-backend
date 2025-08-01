import { IsString, IsOptional } from 'class-validator';

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
