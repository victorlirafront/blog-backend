import { Injectable } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email-request.dto';
import { SendEmailDto } from '../../application/dto/send-email.dto';
import { EmailAddress, EmailContent } from '../../domain/value-objects';
import { EmailConfigService } from '../../application/services/email-config.service';

@Injectable()
export class EmailMapper {
  constructor(private readonly emailConfigService: EmailConfigService) {}

  toApplicationDto(requestDto: SendEmailRequestDto): SendEmailDto {
    const senderEmail = new EmailAddress(requestDto.email);
    const recipient = new EmailAddress(
      this.emailConfigService.getDefaultRecipient(),
    );
    const content = new EmailContent(
      requestDto.name,
      senderEmail,
      requestDto.cellphone,
      requestDto.subject,
      requestDto.message,
    );

    return new SendEmailDto(content, recipient);
  }
}
