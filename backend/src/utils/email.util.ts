import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { CreateLog } from "./logger.util";
dotenv.config({ path: path.resolve(__dirname, "/../../.env") });

let config = {
  host: "smtp.gmail.com",
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.SMTP_USER_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
};

function createTransporter(config: any) {
  return nodemailer.createTransport(config);
}

export const sendEmail = async (
  subject: string,
  to: string,
  html: string
): Promise<void> => {
  try {
    const transporter = createTransporter(config);
    const info = await transporter.sendMail({
      from: process.env.SMTP_USER_EMAIL,
      to,
      subject,
      html,
    });
    CreateLog.debug(`Message sent: ${info.messageId}`);
  } catch (error) {
    CreateLog.error(`Error sending email: ${error}`);
  }
};
