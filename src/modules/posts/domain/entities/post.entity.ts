export class Post {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly content: string,
    public readonly author: string,
    public readonly slug: string,
    public readonly category: string,
    public readonly date: Date,
    public readonly updated_at: Date,
    public readonly meta_tag_title?: string,
    public readonly meta_tag_description?: string,
    public readonly post_image?: string,
    public readonly post_background?: string,
    public readonly keywords?: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.title || this.title.trim().length === 0) {
      throw new Error('Title is required');
    }

    if (!this.content || this.content.trim().length === 0) {
      throw new Error('Content is required');
    }

    if (!this.author || this.author.trim().length === 0) {
      throw new Error('Author is required');
    }

    if (!this.slug || this.slug.trim().length === 0) {
      throw new Error('Slug is required');
    }

    if (!this.category || this.category.trim().length === 0) {
      throw new Error('Category is required');
    }
  }

  update(data: {
    title?: string;
    content?: string;
    author?: string;
    category?: string;
    meta_tag_title?: string;
    meta_tag_description?: string;
    post_image?: string;
    post_background?: string;
    keywords?: string;
  }): Post {
    return new Post(
      this.id,
      data.title ?? this.title,
      data.content ?? this.content,
      data.author ?? this.author,
      this.slug, // Slug não muda após criação
      data.category ?? this.category,
      this.date,
      new Date(), // updated_at sempre atualiza
      data.meta_tag_title ?? this.meta_tag_title,
      data.meta_tag_description ?? this.meta_tag_description,
      data.post_image ?? this.post_image,
      data.post_background ?? this.post_background,
      data.keywords ?? this.keywords,
    );
  }
}
