import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendMail = async (transporter: any, data: any) => {
  const { name, email, phone, subject, message } = data;

  const mailOptions = {
    from: {
      name: name,
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
    await transporter.sendMail(mailOptions);
    console.log('Email has been sent');
  } catch (error) {
    console.error(error);
  }
};

router.post('/sendEmail', async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  const data = {
    name,
    email,
    phone,
    subject,
    message,
  };

  try {
    await sendMail(transporter, data);
    res.status(200).send('Email enviado com sucesso');
  } catch (error) {
    res.status(500).send('Erro ao enviar o email');
  }
});

export default router;
