import nodemailer from 'nodemailer';



const transport = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});

export const sendConfirmationEmail = async (
  name: string,
  email: string,
  confirmationCode: string
) => {
  try {
    return await transport.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Verify your email address to complete the signup and login to your account</p>
          <a href=http://localhost:8000/api/vendors/confirm/${confirmationCode}> Click here</a>
          </div>`,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
