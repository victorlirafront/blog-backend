import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('health')
@Controller({ version: '1' })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Version('1')
  @ApiOperation({
    summary: 'Health check',
    description: 'Checks if the API is running correctly.',
  })
  @ApiResponse({
    status: 200,
    description: 'API is running',
    schema: {
      type: 'string',
      example: 'The blog API is running',
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
