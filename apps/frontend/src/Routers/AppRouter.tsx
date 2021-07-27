import {Redirect, Router, Switch} from 'react-router-dom';
import {historyApp} from 'Core/Utils/RouterUtils/History';
import type {FunctionComponent} from 'react';
import {ROUTE} from 'Core/Const';
import {HRoute} from '@utils-npm/router-utils';
import {Page404} from 'Common/Pages/Page404';
import {AccountRoute} from '../Modules/Account/Routers/AccountRoute';
import {ClientLayout} from 'Common/Layout/ClientLayout';

/**
 * Роутер приложения.
 */
export const AppRouter: FunctionComponent = () => (
    <Router history={historyApp}>
        <HRoute path={ROUTE.APP.PATH}>
            <Switch>
                <HRoute path={ROUTE.CLIENT.LAYOUT_PATH} component={ClientLayout}>
                    <Switch>
                        <HRoute path={ROUTE.CLIENT.ACCOUNT.PATH}>
                            <AccountRoute />
                        </HRoute>

                        <Redirect from={ROUTE.CLIENT.LAYOUT_PATH} to={ROUTE.CLIENT.ACCOUNT.PROFILE.PATH} />
                    </Switch>
                </HRoute>

                <HRoute path="*" component={Page404} />
            </Switch>
        </HRoute>
    </Router>
);
