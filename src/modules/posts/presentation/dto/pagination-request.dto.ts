import { IsOptional, IsPositive, Min, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationRequestDto {
  @ApiPropertyOptional({
    description: 'Page number',
    example: 1,
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    example: 8,
    minimum: 1,
    default: 8,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  limit?: number = 8;

  @ApiPropertyOptional({
    description: 'Filter posts by category',
    example: 'Technology',
  })
  @IsOptional()
  @IsString()
  category?: string;
}
