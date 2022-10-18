import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {
    sendgridAPIKey,
    smtpPassword,
    smtpSender,
    smtpUsername,
} from "../utils/constants";
import sendgridTransport from "nodemailer-sendgrid-transport";
import { MailInterface } from "../interfaces/mail";
import Logging from "../helpers/logs";

export const transporter = nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: sendgridAPIKey,
        },
    })
);

class MailService {
    private static instance: MailService;
    // private transporter: nodemailer.Transporter;

    constructor() {
        // this.createLocalConnection = this.createLocalConnection.bind(this);
        this.createConnection = this.createConnection.bind(this);
    }

    //INTSTANCE CREATE FOR MAIL
    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    //CREATE CONNECTION FOR LOCAL
    // async createLocalConnection() {
    //     let account = await nodemailer.createTestAccount();
    //     this.transporter = nodemailer.createTransport({
    //         host: account.smtp.host,
    //         port: account.smtp.port,
    //         secure: account.smtp.secure,
    //         auth: {
    //             user: account.user,
    //             pass: account.pass,
    //         },
    //     });
    // }

    //CREATE CONNECTION FOR LIVE
    async createConnection() {
        Logging.info("creating connection...");
        return transporter;
    }

    //SEND MAIL
    async sendMail(
        // requestId: string | number | string[],
        options: MailInterface
    ) {
        return await transporter
            .sendMail({
                from: smtpSender,
                to: options.to,
                // cc: options.cc,
                // bcc: options.bcc,
                subject: options.subject,
                // text: options.text,
                html: options.html,
            })
            .then((info) => {
                Logging.info(`Mail sent successfully!!`);
                Logging.info(`[MailResponse]=${info} [MessageID]=${info}`);

                return info;
            })
            .catch((err) => {
                Logging.error(err);
            });
    }

    //VERIFY CONNECTION
    async verifyConnection() {
        return transporter.verify();
    }

    //CREATE TRANSPOTER
    getTransporter() {
        return transporter;
    }
}

export default new MailService();
