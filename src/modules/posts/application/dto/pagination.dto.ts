export class PaginationDto {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 8,
    public readonly category?: string,
  ) {}
}
