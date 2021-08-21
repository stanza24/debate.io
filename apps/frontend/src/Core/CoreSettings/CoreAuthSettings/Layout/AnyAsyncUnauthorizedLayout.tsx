import {asyncDataLoading} from '@utils-npm/async-utils';
import {Spin} from 'antd';
import type {FunctionComponent, ReactNode} from 'react';
import {useSelector} from 'react-redux';
import {IAppState} from '../../../Models';

/**
 * Модель прокидываемых в компонент свойств.
 *
 * @prop children Вложенные компоненты.
 */
interface IProps {
    children?: ReactNode;
}

/**
 * Страница лейаута авторизации.
 */
export const AnyAsyncUnauthorizedLayout: FunctionComponent<IProps> = ({children}: IProps) => {
    const isLoading = useSelector(({coreAuthSettings}: IAppState) =>
        asyncDataLoading(coreAuthSettings.anyAsyncAuthProcess)
    );

    return (
        <div className="w100 h100">
            <Spin spinning={isLoading}>{children}</Spin>
        </div>
    );
};
