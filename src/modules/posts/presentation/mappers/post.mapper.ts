import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from '../dto/create-post-request.dto';
import { UpdatePostRequestDto } from '../dto/update-post-request.dto';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import { CreatePostDto } from '../../application/dto/create-post.dto';
import { UpdatePostDto } from '../../application/dto/update-post.dto';
import { PaginationDto } from '../../application/dto/pagination.dto';
import { Post } from '../../domain/entities/post.entity';
import { Slug } from '../../domain/value-objects';

@Injectable()
export class PostMapper {
  toCreatePostDto(requestDto: CreatePostRequestDto): CreatePostDto {
    const slug = Slug.fromTitle(requestDto.title);
    const post = new Post(
      0, // ID será gerado pelo banco
      requestDto.title,
      requestDto.content,
      requestDto.author,
      slug.getValue(),
      requestDto.category,
      new Date(),
      new Date(),
      requestDto.meta_tag_title,
      requestDto.meta_tag_description,
      requestDto.post_image,
      requestDto.post_background,
      requestDto.keywords,
    );

    return new CreatePostDto(post);
  }

  toUpdatePostDto(id: number, requestDto: UpdatePostRequestDto): UpdatePostDto {
    return new UpdatePostDto(id, {
      title: requestDto.title,
      content: requestDto.content,
      author: requestDto.author,
      category: requestDto.category,
      meta_tag_title: requestDto.meta_tag_title,
      meta_tag_description: requestDto.meta_tag_description,
      post_image: requestDto.post_image,
      post_background: requestDto.post_background,
      keywords: requestDto.keywords,
    });
  }

  toPaginationDto(requestDto: PaginationRequestDto): PaginationDto {
    return new PaginationDto(
      requestDto.page || 1,
      requestDto.limit || 8,
      requestDto.category,
    );
  }
}
