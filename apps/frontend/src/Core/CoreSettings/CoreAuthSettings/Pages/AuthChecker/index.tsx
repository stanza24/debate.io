import {asyncDataFailed, asyncDataIdle} from '@utils-npm/async-utils/src';
import type {IRouteMixedProps} from '@utils-npm/router-utils';
import {FunctionComponent, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {ROUTE} from 'Core/Const';
import {RouterUtils} from 'Core/Utils/RouterUtils';
import {IAppState} from '../../../../Models';
import {RETURN_TO_QUERY_PARAMETER_NAME} from '../../Const';
import {useAuthorizationActions} from '../../Store/Hooks/useAuthorizationActions';

const AUTHORIZATION_ROUTES = [
    ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH,
    ROUTE.UNAUTHORIZED.REGISTRATION.PATH,
    ROUTE.UNAUTHORIZED.RESTORE_PASSWORD.PATH,
];

/** Компонент проверки статуса авторизации. */
export const AuthChecker: FunctionComponent<IRouteMixedProps> = ({location}: IRouteMixedProps) => {
    const isFailed = useSelector(({coreAuthSettings}: IAppState) => asyncDataFailed(coreAuthSettings.user));
    const isIdle = useSelector(({coreAuthSettings}: IAppState) => asyncDataIdle(coreAuthSettings.user));
    const {checkAuth} = useAuthorizationActions();

    useEffect(() => {
        // Если пользователь еще не загружался, проверяем авторизацию.
        if (isIdle) {
            checkAuth().catch(() => {
                const currentPath = RouterUtils.location().pathname;


                if (!AUTHORIZATION_ROUTES.includes(currentPath)) {
                    RouterUtils.redirect(ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH, {
                        search: `${RETURN_TO_QUERY_PARAMETER_NAME}=${encodeURIComponent(currentPath)}`,
                    });
                }
            });
        }
        // Если у пользователя есть ошибка перекидываем на авторизацию
        else if (isFailed) {
            const currentPath = RouterUtils.location().pathname;

            if (!AUTHORIZATION_ROUTES.includes(currentPath)) {
                RouterUtils.redirect(ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH, {
                    preserveParameterNames: [RETURN_TO_QUERY_PARAMETER_NAME],
                });
            }
        }
    }, [checkAuth, isIdle, isFailed, location.pathname]);

    return null;
};
