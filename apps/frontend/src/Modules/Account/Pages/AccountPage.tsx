import {FunctionComponent, ReactNode} from 'react';
import type {IRouteMixedProps} from '@utils-npm/router-utils';
import {AccountTabbedPane} from '../Components/AccountTabbedPane';
import '../Style/AccountPage.less';

/**
 * Параметры роутинга.
 *
 * @prop section Раздел личного кабинета.
 */
type TParams = {
    section: string;
};

/**
 * Модель прокидываемых в компонент свойств.
 *
 * @prop children Обернутые в компонент элементы.
 */
interface IProps {
    children: ReactNode;
}

/** Свойства компонента. */
type TProps = IProps & IRouteMixedProps<TParams>;

/** Страница личного кабинета пользователя. */
export const AccountPage: FunctionComponent<TProps> = ({children, match: {params}}: TProps) => (
    <div className="page-content">
        <AccountTabbedPane section={params.section} />

        <div className="page-workarea">{children}</div>
    </div>
);
