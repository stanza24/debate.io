import {appConfig} from '../../config/appConfig';

const mailerConfig = {
    ...appConfig.mailer,
    transporterOptions: {
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true,
        auth: {
            user: appConfig.mailer.user,
            pass: appConfig.mailer.password,
        },
    },
};

export default mailerConfig;
