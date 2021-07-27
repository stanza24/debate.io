import {HRoute} from '@utils-npm/router-utils/src';
import type {FunctionComponent} from 'react';
import {Redirect, Switch} from 'react-router-dom';
import {ROUTE} from 'Core/Const';
import {AccountPage} from '../Pages/AccountPage';
import {Profile} from '../Components/Profile/Profile';
import {Settings} from '../Components/Profile/Settings';

/** Роут модуля личного кабинета. */
export const AccountRoute: FunctionComponent = () => (
    <HRoute path={ROUTE.CLIENT.ACCOUNT.SECTIONS.PATH} component={AccountPage}>
        <Switch>
            <HRoute exact path={ROUTE.CLIENT.ACCOUNT.PROFILE.PATH} component={Profile} />
            <HRoute exact path={ROUTE.CLIENT.ACCOUNT.SETTINGS.PATH} component={Settings} />

            <Redirect from={ROUTE.CLIENT.ACCOUNT.PATH} to={ROUTE.CLIENT.ACCOUNT.PROFILE.PATH} />
        </Switch>
    </HRoute>
);
