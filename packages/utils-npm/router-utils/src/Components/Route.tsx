import {ComponentType, FunctionComponent} from 'react';
// eslint-disable-next-line no-restricted-imports
import type {RouteComponentProps} from 'react-router';
// eslint-disable-next-line no-restricted-imports
import {Route} from 'react-router-dom';
import type {RouteProps} from 'react-router-dom';

/**
 * HOC над стандартным Route с поддержкой lazy load.
 */
const HOCRoute: FunctionComponent<RouteProps> = <T extends RouteProps>(props: T): JSX.Element => {
    const {component, children, ...restProps} = props;

    if (component) {
        /**
         * Переопределяем тип компонента, чтобы он не кричал на отсутсвие пропсов history и staticContext.
         */
        const Component = component as
            | ComponentType<Omit<RouteComponentProps, 'history' | 'staticContext'>>
            | ComponentType<unknown>;

        /**
         * Мы передаем все пропсы, кроме history и staticContext.
         *
         * history мы не передаём потому что используем RouterUtils
         * staticContext мы не передаем потому что он учавствует только в SSR, если будет нужно то докинем его
         */
        return (
            <Route
                {...restProps}
                render={({history, staticContext, ...renderProps}) => (
                    // renderProps в данном случае IRouteMixedProps
                    <Component {...renderProps}>{children}</Component>
                )}
            />
        );
    }

    return <Route {...props} />;
};

export {HOCRoute as HRoute};
