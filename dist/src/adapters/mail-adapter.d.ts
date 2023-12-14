import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
declare class MailAdapter {
    transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
    send(email: string, subject: string, message: string): Promise<SMTPTransport.SentMessageInfo>;
}
export declare const mailAdapter: MailAdapter;
export {};
