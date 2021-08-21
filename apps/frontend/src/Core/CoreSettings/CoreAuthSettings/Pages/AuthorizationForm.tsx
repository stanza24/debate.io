import {LockOutlined, UserOutlined} from '@ant-design/icons/lib';
import {INPUT_RESTRICTION_XS} from '@debate/common/src/Const';
import {Button, Card, Col, Form, Row, Typography} from 'antd';
import {FunctionComponent, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {ROUTE} from '../../../Const';
import {RouterUtils} from '../../../Utils';
import type {IAuthData} from '../Models';
import {useAuthorizationActions} from '../Store/Hooks/useAuthorizationActions';
import {InputPasswordWithCharactersCountLabel, InputWithCharactersCountLabel} from '@debate/common/src/Components';

/** Компонент авторизации. */
export const AuthorizationForm: FunctionComponent = () => {
    const {signIn} = useAuthorizationActions();
    const {t} = useTranslation();

    const handleSignIn = useCallback((authData: IAuthData) => signIn(authData), [signIn]);

    const handleRedirectToRestorePasswordForm = useCallback(
        () =>
            RouterUtils.redirect(ROUTE.UNAUTHORIZED.RESTORE_PASSWORD.PATH, {
                search: RouterUtils.location().search,
            }),
        []
    );

    return (
        <Card
            title={<Typography.Title level={4}>{t('Unauthorized.Authorization.title')}</Typography.Title>}
            className="unauthorized-form"
        >
            <Form layout="vertical" onFinish={handleSignIn}>
                <Form.Item key="login" name="login" label={t('Unauthorized.Form.login')} rules={[{required: true}]}>
                    <InputWithCharactersCountLabel
                        maxLength={INPUT_RESTRICTION_XS}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={t('Unauthorized.Form.login_placeholder')}
                    />
                </Form.Item>

                <Form.Item
                    key="password"
                    name="password"
                    label={t('Unauthorized.Form.password')}
                    rules={[{required: true}]}
                >
                    <InputPasswordWithCharactersCountLabel
                        maxLength={INPUT_RESTRICTION_XS}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder={t('Unauthorized.Form.password_placeholder')}
                    />
                </Form.Item>
                <Button type="link" onClick={handleRedirectToRestorePasswordForm}>
                    {t('Unauthorized.Authorization.Actions.forgotPassword.goToRestorePassword')}
                </Button>

                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">
                            {t('Unauthorized.Authorization.Actions.signIn')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
