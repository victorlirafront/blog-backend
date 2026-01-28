import {
  Injectable,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { IEmailRepository } from '../../domain/repositories/email.repository.interface';
import { Email } from '../../domain/entities/email.entity';
import {
  IEmailTemplateService,
  EMAIL_TEMPLATE_SERVICE_TOKEN,
} from '../../domain/services/email-template.interface';

@Injectable()
export class ResendEmailRepository implements IEmailRepository {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor(
    private readonly configService: ConfigService,
    @Inject(EMAIL_TEMPLATE_SERVICE_TOKEN)
    private readonly templateService: IEmailTemplateService,
  ) {
    const apiKey = this.configService.get<string>('email.resendApiKey');
    if (!apiKey) {
      throw new Error('RESEND_API_KEY is required');
    }
    this.resend = new Resend(apiKey);
    this.fromEmail =
      this.configService.get<string>('email.fromEmail') ||
      'onboarding@resend.dev';
  }

  async send(email: Email): Promise<void> {
    try {
      const html = this.templateService.render(email.content);

      await this.resend.emails.send({
        from: this.fromEmail,
        to: email.recipient.getValue(),
        subject: `${email.content.subject} ✔`,
        html,
      });
      console.log('Email has been sent');
    } catch (error) {
      console.error('EMAIL ERROR:', error);
      throw new InternalServerErrorException('Erro ao enviar o email');
    }
  }
}
