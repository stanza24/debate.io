import {connectDataBase} from './services/db';
import express from 'express';
import {useRoute} from './routes';
import {usePostMiddlewares, usePreMiddlewares} from './middlewares';
import cookieParser from 'cookie-parser';

/** Функция запускает и настраивает express-сервер. */
export const createServer = async () => {
    const app = express();

    app.use(cookieParser('secret key'));
    usePreMiddlewares(app);
    useRoute(app);
    usePostMiddlewares(app);

    await connectDataBase();

    return app;
};
