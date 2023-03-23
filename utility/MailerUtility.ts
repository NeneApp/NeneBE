import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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
  confirmationCode: string,
  userType: string,
) => {
  try {
    return await transport.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Verify your email address to complete the signup and login to your account</p>
          <a href=${process.env.BASE_URL}/api/${userType}/confirm/${confirmationCode}> Click here</a>`,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
