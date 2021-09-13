import {postMiddlewares, preMiddlewares} from './middlewares';
import type {Application} from 'express';
import type {TMiddleware} from './models';

/**
 * Функция применяет премидлвары к серверу.
 *
 * @param app Приложение.
 */
export const usePreMiddlewares = (app: Application) => {
    preMiddlewares.forEach((middleware: TMiddleware) => {
        app.use(middleware);
    });
};

/**
 * Функция применяет постмидлвары к серверу.
 *
 * @param app Приложение.
 */
export const usePostMiddlewares = (app: Application) => {
    postMiddlewares.forEach((middleware: TMiddleware) => {
        app.use(middleware);
    });
};
