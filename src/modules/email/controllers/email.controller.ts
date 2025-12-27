import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailResponse } from '../views/email.response';
import { SendEmailTransformPipe } from '../pipes/send-email-transform.pipe';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sendEmail')
  async sendEmail(
    @Body(SendEmailTransformPipe) data: SendEmailDto,
  ): Promise<EmailResponse> {
    await this.emailService.sendEmail(data);
    return new EmailResponse('Email enviado com sucesso');
  }
}
