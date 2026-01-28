import { Injectable, PipeTransform } from '@nestjs/common';
import { SendEmailRequestDto } from '../dto/send-email-request.dto';

@Injectable()
export class SendEmailTransformPipe implements PipeTransform {
  transform(value: SendEmailRequestDto): SendEmailRequestDto {
    return {
      ...value,
      name: value.name?.trim(),
      email: value.email?.trim(),
      cellphone: value.cellphone?.trim(),
      subject: value.subject?.trim(),
      message: value.message?.trim(),
    };
  }
}
