import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';
import { Buffer } from 'node:buffer';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { signToken } from '../utility/JwtUtility';

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


export const sendRestPasswordEmail = async (
  name: string,
  email: string
) => {
  const encodeEmail = Buffer.from(email, "utf-8").toString("base64");
  try{
    return await transport.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Reset Password',
      html: `<h1> Password Reset</h1>
          <h2>Hello ${name}</h2>
          <p>Kindly click on the link below to restet your password if forgotten</p>
          <a href=${process.env.BASE_URL}/api/${encodeEmail}> Reset Password </a>`,
    });
  }catch(error: any){
    throw new Error(error.message);
  }
};


