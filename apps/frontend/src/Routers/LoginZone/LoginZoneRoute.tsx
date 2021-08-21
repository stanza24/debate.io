import {HRoute} from '@utils-npm/router-utils/src';
import type {FunctionComponent} from 'react';
import {Switch} from 'react-router';
import {Redirect} from 'react-router-dom';
import {ClientLayout} from 'Common/Layout/ClientLayout';
import {Page404} from 'Common/Pages/Page404';
import {ROUTE} from 'Core/Const';
import {AccountRoute} from 'Modules/Account/Routers/AccountRoute';

const LoginZoneRoute: FunctionComponent = () => (
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
);

export default LoginZoneRoute;
