import {HRoute} from '@utils-npm/router-utils';
import type {FunctionComponent} from 'react';
import {Switch} from 'react-router';
import {ROUTE} from 'Core/Const/RouterConst';
import {AnyAsyncUnauthorizedLayout} from '../Layout/AnyAsyncUnauthorizedLayout';
import {UnauthorizedLayout} from '../Layout/UnauthorizedLayout';
import {AuthChecker} from '../Pages/AuthChecker';
import {AuthorizationForm} from '../Pages/AuthorizationForm';
import {RegistrationForm} from '../Pages/RegistrationForm';
import {RestorePasswordForm} from '../Pages/RestorePasswordForm';

const UnauthorizedRoute: FunctionComponent = () => (
    <AnyAsyncUnauthorizedLayout>
        <Switch>
            <HRoute exact path={ROUTE.UNAUTHORIZED.LAYOUT.PATH} component={UnauthorizedLayout}>
                <HRoute exact path={ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH} component={AuthorizationForm} />
                <HRoute exact path={ROUTE.UNAUTHORIZED.RESTORE_PASSWORD.PATH} component={RestorePasswordForm} />
                <HRoute exact path={ROUTE.UNAUTHORIZED.REGISTRATION.PATH} component={RegistrationForm} />
            </HRoute>
        </Switch>
        {/* Технический Route component, проверяет наличие авторизации и отвечает за сохранение url клиента */}
        <HRoute exact path={'*'} component={AuthChecker} />
    </AnyAsyncUnauthorizedLayout>
);

export default UnauthorizedRoute;
