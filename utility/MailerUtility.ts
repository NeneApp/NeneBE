import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import config from 'config';

const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

export const sendConfirmationEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    return await transport.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: message,
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
