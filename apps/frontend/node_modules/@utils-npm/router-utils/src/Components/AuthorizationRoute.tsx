import {ComponentType, FunctionComponent, ReactNode, Suspense} from 'react';
import type {RouteProps} from 'react-router-dom';
import {HRoute} from './Route';

/**
 * Модель прокидываемых в компонент свойств
 *
 * @prop children обернутые в компонент элементы
 */
interface IProps extends RouteProps {
    hasAuthorization: boolean;
    fallback: NonNullable<ReactNode>;
    authorizationComponent: ComponentType<unknown>;
}

/**
 * HOC над стандартным Route с поддержкой lazy load.
 */
export const AuthorizationRoute: FunctionComponent<IProps> = <T extends IProps>(props: T): JSX.Element => {
    const {hasAuthorization, authorizationComponent, fallback, ...routeProps} = props;

    if (hasAuthorization) {
        return <HRoute {...routeProps} />;
    }

    const Component = authorizationComponent;
    return (
        <Suspense fallback={fallback}>
            <Component />
        </Suspense>
    );
};
