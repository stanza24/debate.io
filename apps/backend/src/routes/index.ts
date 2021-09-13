import {Router} from 'express';
import {ROUTE} from 'core/const/routeConst';
import {authorizationRouter} from 'modules/authorization/router';
import {debatesRouter} from 'modules/debates/router';
import mwAuthorization from 'modules/authorization/middleware/authorization.mw';

/**
 * Функция применяет роуты приложения к серверу.
 *
 * @param app Приложение.
 */
export const useRoute = (app) => {
    const router = Router();

    router.use(ROUTE.API.AUTHORIZATION.FULL_PATH, authorizationRouter);
    router.use(mwAuthorization);
    router.use(ROUTE.API.DEBATES.FULL_PATH, debatesRouter);

    app.use(router);
};
