import { Injectable } from '@nestjs/common';
import { IEmailTemplateService } from '../../domain/services/email-template.interface';
import { EmailContent } from '../../domain/value-objects/email-content.vo';

@Injectable()
export class EmailTemplateService implements IEmailTemplateService {
  render(content: EmailContent): string {
    return `
      <p> nome: ${content.name.trim()} </p>
      <p> celular: ${content.cellphone.trim()} </p>
      <p> email: ${content.email.getValue()} </p>
      <p> mensagem: ${content.message.trim()} </p>
    `;
  }
}
