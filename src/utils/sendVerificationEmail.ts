import * as nodemailer from "nodemailer";
import config from "../config/config";

type EmailProps = {
  token: string;
  to: string;
  text?: string;
  subject?: string;
  html?: string;
};

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise<void>}
 */
export const sendVerificationEmail = async ({ token, to, text, subject, html }: EmailProps) => {
  let transporter = nodemailer.createTransport(config.email.smtp as nodemailer.TransportOptions);
  const content = "HELLO WORLD! " + token;

  await transporter.sendMail({
    from: config.email.from,
    to,
    subject: subject || "Verify Email",
    text: text || "Please verify your email",
    html: html || content,
  });
};
