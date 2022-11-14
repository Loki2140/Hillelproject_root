import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  async sendActivationEmail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Активация аккаунта HillelProject на ${process.env.API_URL}`,
      text: "",
      html: `
          <div>
            <h1> Для активации перейдите по ссылке</h1>
            <button>
              <a href="${link}">Click here!</a>
            </button>
          </div>
          `
    });
  }
}

export const MailS = new MailService();
