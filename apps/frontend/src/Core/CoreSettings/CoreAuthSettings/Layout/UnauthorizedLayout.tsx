import {Space} from 'antd';
import type {FunctionComponent, ReactNode} from 'react';

/**
 * Модель прокидываемых в компонент свойств.
 *
 * @prop [children] Активная страница.
 */
interface IProps {
    children?: ReactNode;
}

/** Страница авторизации с подключенным стейтом и экшнами. */
export const UnauthorizedLayout: FunctionComponent<IProps> = ({children}: IProps) => (
    <div className="w100 h100 flex-center-item unauthorized-page">
        <Space direction="vertical">{children}</Space>
    </div>
);
