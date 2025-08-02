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

export interface PostResponse {
  id: number;
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  meta_tag_title?: string;
  meta_tag_description?: string;
  post_image?: string;
  post_background?: string;
  keywords?: string;
  updated_at: Date;
}
