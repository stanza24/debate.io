import type {RouteComponentProps} from 'react-router-dom';

/**
 * Пропсы обёртки над роутом
 *
 * @example
 * interface IProps extends IRouteMixedProps {
 *     // дополнительыне проперти страницы или лейаута
 * }
 *
 * // Где-нибудь в компоненте
 * switch (props.location.pathname) {
 *     case '/example1':
 *         doAny1();
 *
 * @prop location Текущее расположение
 * @prop match потомки реакт-элементы
 */
export interface IRouteMixedProps<TParams = unknown, TState = unknown, TContext = unknown>
    extends Pick<RouteComponentProps<TParams, TContext, TState>, 'location' | 'match'> {}
