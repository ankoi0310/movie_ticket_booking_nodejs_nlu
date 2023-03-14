import nodemailer from 'nodemailer';
import { emailConfig } from '../config/app';
import Ticket from '../database/model/ticket';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transporter = nodemailer.createTransport(emailConfig);

export const sendVerification = async (email: string, token: string): Promise<SMTPTransport.SentMessageInfo> => {
  const mailOptions = {
    from: emailConfig.auth?.user,
    to: email,
    subject: 'MTB - Verify your email',
    html: `<p>Click <a href="http://localhost:3000/verify/${token}">here</a> to verify your email.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendResetPassword = async (email: string, token: string) => {
  const mailOptions = {
    from: emailConfig.auth?.user,
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendPasswordChanged = async (email: string) => {
  const mailOptions = {
    from: emailConfig.auth?.user,
    to: email,
    subject: 'Password changed',
    html: `<p>Your password has been changed.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendTicketInfo = async (email: string, ticket: Ticket) => {
  const mailOptions = {
    from: emailConfig.auth?.user,
    to: email,
    subject: 'Ticket information',
    html: `<p>Your ticket has been created. Ticket ID: ${ticket._id}</p>`,
  };

  await transporter.sendMail(mailOptions);
};

export const sendVoucher = async (email: string, ticket: Ticket) => {
  const mailOptions = {
    from: emailConfig.auth?.user,
    to: email,
    subject: 'Voucher',
    html: `<p>Your voucher is: ${ticket._id}</p>`,
  };

  await transporter.sendMail(mailOptions);
}