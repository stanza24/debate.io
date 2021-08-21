import dotenv from 'dotenv';

dotenv.config();

/** Параметры сервера. */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '3000';

const server = {
    hostname: process.env.SERVER_HOSTNAME,
    port: process.env.SERVER_HOSTNAME,
    url: `${SERVER_HOSTNAME}:${SERVER_PORT}`,
};

/** Параметры базы данных. */
const MONGO_USERNAME = process.env.MONGO_USERNAME || 'stanzzza';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '24091996';
const MONGO_HOST =
    process.env.MONGO_HOST ||
    'mongodb+srv://stanzzza:24091996@cluster0.wls0u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const mongo = {
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    host: MONGO_HOST,
};

/** Параметры почтового мейлера. */
const MAILER_USER = process.env.MAILER_USER || 'va22no@yandex.ru';
const MAILER_PASSWORD = process.env.MAILER_PASSWORD || '24091996aA!';
const MAILER_FROM = 'No Reply <noreply@example.com>';

const mailer = {
    user: MAILER_USER,
    password: MAILER_PASSWORD,
    from: MAILER_FROM,
};

/** Параметры CORS. */
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true,
};

/** Параметры авторизации. */
const JWT_SECRET = process.env.JWT_SECRET;

const authOptions = {
    jwtSecret: JWT_SECRET,
    tokens: {
        access: {
            type: 'access',
            expiresIn: '1ms',
        },
        refresh: {
            type: 'refresh',
            expiresIn: '1d',
        },
        verify: {
            type: 'verify',
            expiresIn: '1d',
        },
    },
};

export const appConfig = {
    server,
    mongo,
    corsOptions,
    mailer,
    authOptions,
};
