import {Card, Progress, Row, Space, Typography} from 'antd';
import type {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {userSelector} from 'Core/CoreSettings/CoreAuthSettings/Store/Selectors/CoreAuthSettingsSelector';

/** Компонент карточки статистики в личном кабинете. */
export const StatisticCard: FunctionComponent = () => {
    const {progress} = useSelector(userSelector);
    const {t} = useTranslation();

    return (
        <Card
            size="small"
            title={<Typography.Title level={5}>{t('Account.Components.StatisticCard.title')}</Typography.Title>}
        >
            <Row justify="center">
                <Progress
                    type="circle"
                    percent={(100 * progress.exp) / progress.expToNewRank}
                    format={() => (
                        <Space direction="vertical">
                            <Typography.Text>
                                {t('Account.Components.StatisticCard.rank', {rank: progress.rank})}
                            </Typography.Text>
                            <Typography.Text type="secondary">
                                {t('Account.Components.StatisticCard.exp', {
                                    exp: progress.exp,
                                    expToNewRank: progress.expToNewRank,
                                })}
                            </Typography.Text>
                        </Space>
                    )}
                />
            </Row>
        </Card>
    );
};
