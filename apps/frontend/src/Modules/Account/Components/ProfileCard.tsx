import {GlobalOutlined, MailOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Card, Col, Image, List, Row, Space, Typography} from 'antd';
import type {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {userSelector} from 'Core/CoreSettings/CoreAuthSettings/Store/Selectors/CoreAuthSettingsSelector';

/** Компонент карточки профиля в личном кабинете. */
export const ProfileCard: FunctionComponent = () => {
    const user = useSelector(userSelector);
    const {t} = useTranslation();

    return (
        <Card
            size="small"
            title={<Typography.Title level={5}>{t('Account.Components.ProfileCard.title')}</Typography.Title>}
            extra={<Button type="default">{t('Account.Components.ProfileCard.extra')}</Button>}
        >
            <List>
                <List.Item>
                    <Row gutter={16}>
                        <Col>
                            <Image
                                preview={
                                    user.profile.avatar
                                        ? {
                                              mask: null,
                                              src: user.profile.avatar.preview || user.profile.avatar.thumbnail,
                                          }
                                        : false
                                }
                                width={50}
                                src={
                                    user.profile.avatar?.thumbnail ||
                                    'https://img.icons8.com/ios/50/000000/user--v1.png'
                                }
                                alt="image"
                                className="account-page-avatar-preview"
                            />
                        </Col>
                        <Col flex={1}>
                            <Typography.Title level={2}>
                                {t('Account.Components.AccountTabbedPane.fullName', {
                                    firstName: user.profile.firstName,
                                    lastName: user.profile.lastName,
                                })}
                            </Typography.Title>
                            <Typography.Text type="secondary">
                                {t('Account.Components.AccountTabbedPane.userName', {
                                    userName: user.username,
                                })}
                            </Typography.Text>
                        </Col>
                    </Row>
                </List.Item>
                <List.Item>
                    <Typography.Text type="secondary">
                        <Space>
                            <MailOutlined />
                            {t('Account.Components.ProfileCard.fields.email')}
                        </Space>
                    </Typography.Text>
                    <Typography.Text>{user.email}</Typography.Text>
                </List.Item>
                {user.profile.countryName && (
                    <List.Item>
                        <Typography.Text type="secondary">
                            <Space>
                                <GlobalOutlined />
                                {t('Account.Components.ProfileCard.fields.countryName')}
                            </Space>
                        </Typography.Text>
                        <Typography.Text>{user.profile.countryName}</Typography.Text>
                    </List.Item>
                )}
                {user.profile.aboutMe && (
                    <List.Item>
                        <Typography.Text type="secondary">
                            <Space>
                                <UserOutlined />
                                {t('Account.Components.ProfileCard.fields.aboutMe')}
                            </Space>
                        </Typography.Text>
                        <Typography.Text>{user.profile.aboutMe}</Typography.Text>
                    </List.Item>
                )}
            </List>
        </Card>
    );
};
