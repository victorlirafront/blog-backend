export const CACHE_TTL = {
  SHORT: 300000,
  MEDIUM: 600000,
  LONG: 1800000,
} as const;

export const CACHE_KEYS = {
  POST_BY_ID: (id: number) => `post:id:${id}`,
  POST_BY_SLUG: (slug: string) => `post:slug:${slug}`,
  POSTS_LIST: (category: string, page: number, limit: number) =>
    `posts:${category || 'all'}:page:${page}:limit:${limit}`,
  POSTS_BY_AUTHOR: (author: string) => `posts:author:${author}`,
  POSTS_BY_CATEGORY: (category: string) => `posts:category:${category}`,
  POSTS_PATTERN: (pattern: string) => `posts:${pattern}*`,
} as const;
