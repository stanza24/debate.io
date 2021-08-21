import type {IRouteMixedProps} from '@utils-npm/router-utils';
import {Col, Divider, Row} from 'antd';
import type {FunctionComponent, ReactNode} from 'react';
import {AccountTabbedPane} from '../Components/AccountTabbedPane';
import {AchievementsCard} from '../Components/AchievementsCard';
import {ProfileCard} from '../Components/ProfileCard';
import {StatisticCard} from '../Components/StatisticCard';
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
        <Row gutter={24}>
            <Col span={8}>
                <ProfileCard />
            </Col>
            <Col flex={1}>
                <Row gutter={8}>
                    <Col span={12}>
                        <StatisticCard />
                    </Col>
                    <Col span={12}>
                        <AchievementsCard />
                    </Col>
                </Row>
            </Col>
        </Row>

        <Divider />

        <AccountTabbedPane section={params.section} />
        <div className="page-workarea">{children}</div>
    </div>
);
