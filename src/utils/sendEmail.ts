import * as nodemailer from "nodemailer";
import config from "../config/config";

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @param {string} html
 * @returns {Promise<void>}
 */
export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
  let transporter = nodemailer.createTransport(config.email.smtp as nodemailer.TransportOptions);

  await transporter.sendMail({
    from: config.email.from,
    to,
    subject,
    text,
    html,
  });
};
