import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "victorliradev@gmail.com",
        pass: "rima mwrb fmni xqfa",
      },
      // Configurações para evitar timeout
      connectionTimeout: 60000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });
  }

  async sendEmail(data: SendEmailDto): Promise<void> {
    const { name, email, cellphone, subject, message } = data;

    const mailOptions = {
      from: {
        name,
        address: "victorliradev@gmail.com",
      },
      to: ['victorliradev@gmail.com'],
      subject: `${subject} ✔`,
      text: 'Hello world?',
      html: `
        <p> celular: ${cellphone} </p>
        <p> email: ${email} </p>
        <p> mensagem: ${message} </p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email has been sent successfully');
    } catch (error) {
      console.error('Email sending error:', error);
      throw new InternalServerErrorException('Erro ao enviar o email');
    }
  }
}
