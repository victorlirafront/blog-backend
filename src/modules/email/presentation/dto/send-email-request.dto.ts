import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailRequestDto {
  @ApiProperty({
    description: 'Sender name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Sender email address',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Sender phone number',
    example: '+1 (555) 123-4567',
  })
  @IsString()
  @IsNotEmpty()
  cellphone: string;

  @ApiProperty({
    description: 'Email subject',
    example: 'Contact through website',
  })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({
    description: 'Email message',
    example: 'Hello, I would like to get in touch...',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
