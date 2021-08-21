import {Router} from 'express';
import {ROUTE} from '../const/routeConst';
import {authorizationRouter} from '../modules/authorization/router';
import {debatesRouter} from '../modules/debates/router';
import {authMiddleware} from '../modules/authorization/middleware';

/**
 * Функция применяет роуты приложения к серверу.
 *
 * @param app Приложение.
 */
export const useRoute = (app) => {
    const router = Router();

    router.use(ROUTE.API.AUTHORIZATION.FULL_PATH, authorizationRouter);
    router.use(authMiddleware);
    router.use(ROUTE.API.DEBATES.FULL_PATH, debatesRouter);

    app.use(router);
};
