export type CreatePostParams = {
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  meta_tag_title: string;
  meta_tag_description: string;
  post_image: string;
  post_background: string;
  keywords: string
};

export type UpdatePostParams = {
  title: string;
  content: string;
  author: string;
  date: Date;
  category: string;
  meta_tag_title: string;
  meta_tag_description: string;
  post_image: string;
  post_background: string;
  keywords: string
};