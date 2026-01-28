import { EmailAddress } from './email-address.vo';

export class EmailContent {
  constructor(
    public readonly name: string,
    public readonly email: EmailAddress,
    public readonly cellphone: string,
    public readonly subject: string,
    public readonly message: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Name is required');
    }

    if (!this.cellphone || this.cellphone.trim().length === 0) {
      throw new Error('Cellphone is required');
    }

    if (!this.subject || this.subject.trim().length === 0) {
      throw new Error('Subject is required');
    }

    if (!this.message || this.message.trim().length === 0) {
      throw new Error('Message is required');
    }
  }
}
