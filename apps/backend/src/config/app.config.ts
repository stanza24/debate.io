import dotenv from 'dotenv';

dotenv.config();

/** Параметры сервера. */
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const SERVER_PORT = process.env.SERVER_PORT || '4200';

const server = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
    url: `http://${SERVER_HOSTNAME}:${SERVER_PORT}`,
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
const MAILER_USER = process.env.MAILER_USER || 'debate.io.email@gmail.com';
const MAILER_PASSWORD = process.env.MAILER_PASSWORD || 'tvtavxstubrncfje';
const MAILER_FROM = 'No Reply <noreply@example.com>';

const mailer = {
    user: MAILER_USER,
    password: MAILER_PASSWORD,
    from: MAILER_FROM,
};

/** Параметры CORS. */
const corsOptions = {
    origin: process.env.ORIGIN || '127.0.0.1:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};

/** Параметры авторизации. */
const JWT_SECRET = process.env.JWT_SECRET || 'my-jwt-secret';

const authOptions = {
    jwtSecret: JWT_SECRET,
    tokens: {
        access: {
            type: 'access',
            expiresIn: '15m',
        },
        refresh: {
            type: 'refresh',
            expiresIn: '60d',
        },
        activate: {
            type: 'activate',
            expiresIn: '1d',
        },
    },
};

export const config = {
    server,
    mongo,
    corsOptions,
    mailer,
    authOptions,
};
