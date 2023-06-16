import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";
import log from "./logger";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  },
});
// shopneneapp@gmail.com
// Reshaping1Experience$
export const sendConfirmationEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  try {
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject,
      html: message,
    };
    return await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred while sending email:", error);
      } else {
        console.log("Email sent successfully!", info.response);
      }
    });
  } catch (error: any) {
    log.error(error.message);
  }
};
