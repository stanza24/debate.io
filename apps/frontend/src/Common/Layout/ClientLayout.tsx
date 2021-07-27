import {Layout} from 'antd';
import type {FunctionComponent, ReactNode} from 'react';
import {Header} from 'Common/Components/Header';

/**
 * Модель прокидываемых в компонент свойств.
 *
 * @prop children Обернутые в компонент элементы.
 */
interface IProps {
    children: ReactNode;
}

/** Общий вид страницы рабочего пространства пользователя. */
export const ClientLayout: FunctionComponent<IProps> = ({children}: IProps) => (
    <Layout className="client-layout">
        <Layout.Header>
            <div className="layout-centering-container">
                <Header />
            </div>
        </Layout.Header>

        <div className="page-layout">
            <div className="layout-centering-container">
                {children}
            </div>
        </div>
    </Layout>
);
