import { ApiProperty } from '@nestjs/swagger';

export class EmailResponse {
  @ApiProperty({
    description: 'Response message',
    example: 'Email sent successfully',
  })
  message: string;

  @ApiProperty({
    description: 'Indicates if the operation was successful',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  timestamp: Date;

  constructor(message: string, success: boolean = true) {
    this.message = message;
    this.success = success;
    this.timestamp = new Date();
  }
}
