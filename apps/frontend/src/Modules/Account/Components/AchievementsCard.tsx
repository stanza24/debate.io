import {Card, Col, Image, Progress, Row, Typography} from 'antd';
import type {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {userSelector} from 'Core/CoreSettings/CoreAuthSettings/Store/Selectors/CoreAuthSettingsSelector';

/** Компонент карточки достижений в личном кабинете. */
export const AchievementsCard: FunctionComponent = () => {
    const {achievements} = useSelector(userSelector);
    const {t} = useTranslation();

    return (
        <Card
            size="small"
            title={<Typography.Title level={5}>{t('Account.Components.AchievementsCard.title')}</Typography.Title>}
        >
            <Progress
                percent={(100 * achievements.done.length) / achievements.total}
                format={() => (
                    <Typography.Text type="secondary">
                        {achievements.done.length}/{achievements.total}
                    </Typography.Text>
                )}
            />
            <Row gutter={[16, 16]}>
                {achievements.done.map((achievement) => (
                    <Col key={achievement.id} span={12}>
                        <Card size="small">
                            <Row justify="space-between">
                                <Typography.Text>{t(`Achievements.${achievement.name}`)}</Typography.Text>
                                <Image preview={false} width={25} src={achievement.icon} alt="image" />
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};
