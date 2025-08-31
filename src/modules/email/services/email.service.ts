import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendEmailDto } from '../dto/send-email.dto';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Logs detalhados para debug das variáveis de ambiente
    console.log('=== EMAIL SERVICE DEBUG ===');
    console.log('BLOG_USER_EMAIL:', process.env.BLOG_USER_EMAIL);
    console.log('BLOG_APP_PASSWORD:', process.env.BLOG_APP_PASSWORD ? '***SET***' : 'NOT SET');
    console.log('BLOG_NODE_ENV:', process.env.BLOG_NODE_ENV);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('All env vars:', Object.keys(process.env).filter(key => key.includes('BLOG')));
    console.log('==========================');

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.BLOG_USER_EMAIL,
        pass: process.env.BLOG_APP_PASSWORD,
      },
    });
  }

  async sendEmail(data: SendEmailDto): Promise<void> {
    const { name, email, cellphone, subject, message } = data;

    const mailOptions = {
      from: {
        name,
        address: process.env.BLOG_USER_EMAIL,
      },
      to: ['victorliracorporativo@gmail.com'],
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
