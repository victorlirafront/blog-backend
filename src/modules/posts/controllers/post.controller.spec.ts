import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from '../services/post.service';
import { PaginationDto } from '../dto/pagination.dto';
import { PaginationResponse, PostResponse } from '../views/post.response';

describe('PostController', () => {
  let controller: PostController;
  let service: PostService;

  const mockPostService = {
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /posts', () => {
    it('should return paginated posts successfully', async () => {
      // Arrange
      const paginationDto: PaginationDto = { page: 1, limit: 8 };
      const mockResponse: PaginationResponse<PostResponse> = {
        results: [
          {
            id: 1,
            title: 'Test Post',
            content: 'Test Content',
            author: 'Test Author',
            category: 'Test Category',
            date: new Date(),
            updated_at: new Date(),
          },
        ],
        totalPages: 1,
        next: null,
        previous: null,
      };

      mockPostService.findAll.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.findAll(paginationDto);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(paginationDto);
      expect(result).toEqual(mockResponse);
      expect(result.results).toHaveLength(1);
      expect(result.results[0].title).toBe('Test Post');
    });
  });
}); 