import * as nodemailer from "nodemailer";
import config from "../config/config";
import { logger } from "../utils/logger";

export class MailerService {
  sendVerificationEmail = async (to: string | string[], name: string, token: string) => {
    const { username, password } = config.email;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: username,
        pass: password,
      },
    });

    const info = await transporter.sendMail({
      from: username,
      to,
      subject: "Email Verification",
      text: "Email Verification",
      html: `Hello ${name},
    <br /><br />
    Your account has been created. To log in, please proceed to the following address <a clicktracking="off" href='${config.web.baseUrl}/auth/complete-registration/${token}'>here</a>
    where you will set a password for your first-time login.
    <br /><br />
    Thank you,
    <br />
    Admin`,
    });

    logger.info("Email sent", info.response);
  };
}
