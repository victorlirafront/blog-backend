import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './presentation/controllers/email.controller';
import { SendEmailUseCase } from './application/use-cases/send-email.use-case';
import { EmailMapper } from './presentation/mappers/email.mapper';
import { EmailConfigService } from './application/services/email-config.service';
import { ResendEmailRepository } from './infrastructure/repositories/resend-email.repository';
import { EmailTemplateService } from './infrastructure/services/email-template.service';
import { EMAIL_REPOSITORY_TOKEN } from './domain/repositories/email.repository.interface';
import { EMAIL_TEMPLATE_SERVICE_TOKEN } from './domain/services/email-template.interface';
import emailConfig from './infrastructure/config/email.config';

const EmailRepositoryProvider = {
  provide: EMAIL_REPOSITORY_TOKEN,
  useClass: ResendEmailRepository,
};

const EmailTemplateServiceProvider = {
  provide: EMAIL_TEMPLATE_SERVICE_TOKEN,
  useClass: EmailTemplateService,
};

@Module({
  imports: [ConfigModule.forFeature(emailConfig)],
  controllers: [EmailController],
  providers: [
    SendEmailUseCase,
    EmailMapper,
    EmailConfigService,
    EmailRepositoryProvider,
    EmailTemplateServiceProvider,
    ResendEmailRepository,
    EmailTemplateService,
  ],
  exports: [SendEmailUseCase],
})
export class EmailModule {}
