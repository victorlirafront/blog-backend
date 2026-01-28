import { EmailContent } from '../value-objects/email-content.vo';

export const EMAIL_TEMPLATE_SERVICE_TOKEN = Symbol('IEmailTemplateService');

export interface IEmailTemplateService {
  render(content: EmailContent): string;
}
