import { EmailAddress, EmailContent } from '../../domain/value-objects';

export class SendEmailDto {
  constructor(
    public readonly content: EmailContent,
    public readonly recipient: EmailAddress,
  ) {}
}
