import nodemailer, {SentMessageInfo} from 'nodemailer';
import type {Options} from 'nodemailer/lib/mailer';
import config from './mailer.config';
import {logger} from '../logger';

/**
 * Модель обработчиков результатов отправки письма.
 *
 * @prop [onSuccess] Обработчик результата успешной отправки.
 * @prop [onError] Обработчик ошибки при отправке.
 * @prop [onFinished] Финальный обработчик любого результата.
 */
export interface IEmailResultsHandlers {
    onSuccess?: (info: SentMessageInfo) => void;
    onError?: (err: Error) => void;
    onFinished?: () => void;
}

const NAMESPACE = 'Mailer';

/**
 * Функция отправляет письмо, используя почтовый сервис.
 *
 * @param mailOptions Параметры сообщения.
 * @param handlers Обработчики результатов отправки письма.
 */
export const sendEmail = (mailOptions: Omit<Options, 'from'>, handlers: IEmailResultsHandlers = {}) => {
    const transporter = nodemailer.createTransport(config.transporterOptions);

    transporter.sendMail({...mailOptions, from: config.from}, (error, info) => {
        if (error) {
            logger.error(NAMESPACE, 'Email has not been sent', error);
            handlers.onError && handlers.onError(error);
        } else {
            logger.info(NAMESPACE, 'Email sent:', info);
            handlers.onSuccess && handlers.onSuccess(info);
        }

        handlers.onFinished && handlers.onFinished();
    });
};
