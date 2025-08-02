import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from '../services/email.service';
import { SendEmailDto } from '../dto/send-email.dto';
import { EmailResponse } from '../views/email.response';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sendEmail')
  async sendEmail(@Body() data: SendEmailDto): Promise<EmailResponse> {
    await this.emailService.sendEmail(data);
    return new EmailResponse('Email enviado com sucesso');
  }
}
