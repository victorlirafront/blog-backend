import { Injectable, PipeTransform } from '@nestjs/common';
import { SendEmailDto } from '../dto';

@Injectable()
export class SendEmailTransformPipe implements PipeTransform {
  transform(value: SendEmailDto) {
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
