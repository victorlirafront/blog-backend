export class Slug {
  private readonly value: string;

  constructor(slug: string) {
    if (!this.isValid(slug)) {
      throw new Error('Invalid slug format');
    }
    this.value = slug.toLowerCase().trim();
  }

  private isValid(slug: string): boolean {
    // Slug deve conter apenas letras, números, hífens e underscores
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug.toLowerCase().trim());
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }

  static fromTitle(title: string): Slug {
    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
      .replace(/\s+/g, '-') // Substitui espaços por hífens
      .replace(/-+/g, '-') // Remove hífens duplicados
      .replace(/^-|-$/g, ''); // Remove hífens no início e fim

    return new Slug(slug);
  }
}
