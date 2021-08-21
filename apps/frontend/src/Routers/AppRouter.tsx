import {AppLoader} from '@debate/common/src/Components/Loaders/AppLoader';
import {AuthorizationRoute} from '@utils-npm/router-utils';
import {FunctionComponent, Suspense} from 'react';
import {useSelector} from 'react-redux';
import {Router, Switch} from 'react-router-dom';
import {ROUTE} from 'Core/Const';
import {AnyAsyncUnauthorizedLayout} from 'Core/CoreSettings/CoreAuthSettings/Layout/AnyAsyncUnauthorizedLayout';
import LazyUnauthorizedRoute from 'Core/CoreSettings/CoreAuthSettings/Routers/LazyUnauthorizedRoute';
import {IAppState} from 'Core/Models';
import {historyApp} from 'Core/Utils/RouterUtils/History';
import LazyLoginZoneRoute from './LoginZone/LazyLoginZoneRoute';

/**
 * Роутер приложения.
 */
export const AppRouter: FunctionComponent = () => {
    const hasAuthorization = useSelector(({coreAuthSettings}: IAppState) => !!coreAuthSettings.user.data);

    return (
        <Router history={historyApp}>
            <AnyAsyncUnauthorizedLayout>
                <Switch>
                    <AuthorizationRoute
                        path={ROUTE.APP.PATH}
                        fallback={<AppLoader />}
                        hasAuthorization={hasAuthorization}
                        authorizationComponent={LazyUnauthorizedRoute}
                    >
                        <Suspense fallback={<AppLoader />}>
                            <LazyLoginZoneRoute />
                        </Suspense>
                    </AuthorizationRoute>
                </Switch>
            </AnyAsyncUnauthorizedLayout>
        </Router>
    );
};
