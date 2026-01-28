import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailUseCase } from '../../application/use-cases/send-email.use-case';
import { EmailMapper } from '../mappers/email.mapper';
import { SendEmailRequestDto } from '../dto/send-email-request.dto';
import { EmailResponse } from '../views/email.response';
import { SendEmailTransformPipe } from '../pipes/send-email-transform.pipe';

@ApiTags('email')
@Controller({ version: '1' })
export class EmailController {
  constructor(
    private readonly sendEmailUseCase: SendEmailUseCase,
    private readonly emailMapper: EmailMapper,
  ) {}

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
    @Body(SendEmailTransformPipe) data: SendEmailRequestDto,
  ): Promise<EmailResponse> {
    const dto = this.emailMapper.toApplicationDto(data);

    await this.sendEmailUseCase.execute(dto);

    return new EmailResponse('Email sent successfully');
  }
}
