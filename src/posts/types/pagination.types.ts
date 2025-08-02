export interface PaginationMeta {
  page: number;
  limit: number;
}

export interface PaginationResponse<T> {
  next?: PaginationMeta;
  previous?: PaginationMeta;
  totalPages: number;
  results: T[];
} 