import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  private resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendEmail(data: SendEmailDto): Promise<void> {
    const { name, email, cellphone, subject, message } = data;

    try {
      await this.resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'victorliradev@gmail.com',
        subject: `${subject} ✔`,
        html: `
          <p> nome: ${name} </p>
          <p> celular: ${cellphone} </p>
          <p> email: ${email} </p>
          <p> mensagem: ${message} </p>
        `,
      });
      console.log('Email has been sent');
    } catch (error) {
      console.error('EMAIL ERROR:', error);
      throw new InternalServerErrorException('Erro ao enviar o email');
    }
  }
}
