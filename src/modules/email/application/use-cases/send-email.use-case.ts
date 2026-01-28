import { Injectable, Inject } from '@nestjs/common';
import {
  IEmailRepository,
  EMAIL_REPOSITORY_TOKEN,
} from '../../domain/repositories/email.repository.interface';
import { Email } from '../../domain/entities/email.entity';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class SendEmailUseCase {
  constructor(
    @Inject(EMAIL_REPOSITORY_TOKEN)
    private readonly emailRepository: IEmailRepository,
  ) {}

  async execute(dto: SendEmailDto): Promise<void> {
    const email = Email.create(dto.content, dto.recipient);

    try {
      await this.emailRepository.send(email);
      // Email sent successfully - status is tracked in the entity
    } catch (error) {
      // Email failed - status is tracked in the entity
      throw error;
    }
  }
}
