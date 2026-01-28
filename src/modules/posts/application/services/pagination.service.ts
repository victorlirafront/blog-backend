import { Injectable } from '@nestjs/common';

export interface PaginationMeta {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  next?: PaginationMeta;
  previous?: PaginationMeta;
  totalPages: number;
  results: T[];
}

@Injectable()
export class PaginationService {
  paginate<T>(data: T[], page = 1, limit = 8): PaginationResult<T> {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results: PaginationResult<T> = {
      results: [],
      totalPages: Math.ceil(data.length / limit),
    };

    if (endIndex < data.length) {
      results.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      results.previous = { page: page - 1, limit };
    }

    results.results = [...data].slice(startIndex, endIndex);

    return results;
  }
}
