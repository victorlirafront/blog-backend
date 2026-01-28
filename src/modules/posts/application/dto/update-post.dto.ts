export class UpdatePostDto {
  constructor(
    public readonly id: number,
    public readonly data: {
      title?: string;
      content?: string;
      author?: string;
      category?: string;
      meta_tag_title?: string;
      meta_tag_description?: string;
      post_image?: string;
      post_background?: string;
      keywords?: string;
    },
  ) {}
}
