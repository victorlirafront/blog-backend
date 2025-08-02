import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    console.log('Email Service - USER_EMAIL:', process.env.USER_EMAIL);
    console.log(
      'Email Service - APP_PASSWORD:',
      process.env.APP_PASSWORD ? '***' : 'NOT SET',
    );

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async sendEmail(data: SendEmailDto): Promise<void> {
    const { name, email, phone, subject, message } = data;

    console.log('Sending email with data:', { name, email, phone, subject });

    const mailOptions = {
      from: {
        name,
        address: process.env.USER_EMAIL,
      },
      to: ['victorliracorporativo@gmail.com'],
      subject: `${subject} ✔`,
      text: 'Hello world?',
      html: `
        <p> celular: ${phone} </p>
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
