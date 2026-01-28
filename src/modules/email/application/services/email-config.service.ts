import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailConfigService {
  constructor(private readonly configService: ConfigService) {}

  getDefaultRecipient(): string {
    return (
      this.configService.get<string>('email.defaultRecipient') ||
      'victorliradev@gmail.com'
    );
  }
}
