import middlewares from './middlewares';
import type {Application} from 'express';
import type {TMiddleware} from './models';

/**
 * Функция применяет мидлвары к серверу.
 *
 * @param app Приложение.
 */
export const useMiddlewares = (app: Application) => {
    middlewares.forEach((middleware: TMiddleware) => {
        if (Array.isArray(middleware)) {
            middleware.forEach((mw) => app.use(mw));
        } else {
            app.use(middleware);
        }
    });
};
