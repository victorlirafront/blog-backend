import { EmailAddress, EmailContent } from '../value-objects';

export class Email {
  constructor(
    public readonly id: string,
    public readonly content: EmailContent,
    public readonly recipient: EmailAddress,
    public readonly sentAt: Date,
    public readonly status: 'pending' | 'sent' | 'failed',
  ) {}

  static create(content: EmailContent, recipient: EmailAddress): Email {
    return new Email(
      this.generateId(),
      content,
      recipient,
      new Date(),
      'pending',
    );
  }

  markAsSent(): Email {
    return new Email(
      this.id,
      this.content,
      this.recipient,
      this.sentAt,
      'sent',
    );
  }

  markAsFailed(): Email {
    return new Email(
      this.id,
      this.content,
      this.recipient,
      this.sentAt,
      'failed',
    );
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
