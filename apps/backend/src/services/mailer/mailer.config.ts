import {config} from 'config/app.config';

/**
 * Mailer SMTP options.
 */
const mailerConfig = {
    ...config.mailer,
    transporterOptions: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.mailer.user,
            pass: config.mailer.password,
        },
    },
};

export default mailerConfig;
