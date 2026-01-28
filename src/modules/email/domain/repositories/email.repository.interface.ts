import { Email } from '../entities/email.entity';

export const EMAIL_REPOSITORY_TOKEN = Symbol('IEmailRepository');

export interface IEmailRepository {
  send(email: Email): Promise<void>;
}
