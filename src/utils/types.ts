export type CreatePostParams = {
  title: string;
  content: string;
  author: string;
  published?: boolean;
  tags?: string;
};

export type UpdatePostParams = {
  title?: string;
  content?: string;
  author?: string;
  published?: boolean;
  tags?: string;
};
