import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailResponse } from '../views/email.response';
import { SendEmailTransformPipe } from '../pipes/send-email-transform.pipe';

@ApiTags('email')
@Controller({ version: '1' })
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sendEmail')
  @Version('1')
  @ApiOperation({
    summary: 'Send email',
    description: 'Sends a contact email through the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
    type: EmailResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data provided',
  })
  async sendEmail(
    @Body(SendEmailTransformPipe) data: SendEmailDto,
  ): Promise<EmailResponse> {
    await this.emailService.sendEmail(data);
    return new EmailResponse('Email sent successfully');
  }
}
