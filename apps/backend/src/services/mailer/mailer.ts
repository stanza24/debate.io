import nodemailer from 'nodemailer';
import type {Options} from 'nodemailer/lib/mailer';
import config from './mailer.config';
import {logger} from '../logger';

const NAMESPACE = 'Mailer';

/**
 * Функция отправляет письмо, используя почтовый сервис.
 *
 * @param mailOptions Параметры сообщения.
 */
export const sendEmail = (mailOptions: Omit<Options, 'from'>) => {
    const transporter = nodemailer.createTransport(config.transporterOptions);

    transporter.sendMail({...mailOptions, from: config.from}, (error, info) => {
        if (error) {
            logger.error(NAMESPACE, 'Email has not been sent', error);
        } else {
            logger.info(NAMESPACE, 'Email sent:', info);
        }
    });
};
