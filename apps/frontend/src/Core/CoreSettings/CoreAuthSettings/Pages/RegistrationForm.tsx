import {LockOutlined, UserOutlined} from '@ant-design/icons/lib';
import {INPUT_RESTRICTION_XS} from '@debate/common/src/Const';
import {Button, Card, Col, Form, Row, Typography} from 'antd';
import {FunctionComponent, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ROUTE} from '../../../Const';
import {RouterUtils} from '../../../Utils';
import type {ISignUpData} from '../Models';
import {useAuthorizationActions} from '../Store/Hooks/useAuthorizationActions';
import {InputPasswordWithCharactersCountLabel, InputWithCharactersCountLabel} from '@debate/common/src/Components';
import {getEmailValidationRules} from '../Utils/ValidationUtils';

/** Компонент авторизации. */
export const RegistrationForm: FunctionComponent = () => {
    const {signUp} = useAuthorizationActions();
    const {t} = useTranslation();

    const emailValidationRules = useMemo(() => getEmailValidationRules(t), [t]);

    const handleSignUp = useCallback((signUpData: ISignUpData) => signUp(signUpData), [signUp]);

    const handleRedirectToRestorePasswordForm = useCallback(
        () =>
            RouterUtils.redirect(ROUTE.UNAUTHORIZED.RESTORE_PASSWORD.PATH, {
                search: RouterUtils.location().search,
            }),
        []
    );

    return (
        <Card
            title={<Typography.Title level={4}>{t('Unauthorized.Registration.title')}</Typography.Title>}
            className="unauthorized-form"
        >
            <Form layout="vertical" onFinish={handleSignUp}>
                <Form.Item key="email" name="email" label={t('Unauthorized.Form.email')} rules={emailValidationRules}>
                    <InputWithCharactersCountLabel
                        maxLength={INPUT_RESTRICTION_XS}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={t('Unauthorized.Form.email_placeholder')}
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
                    {t('Unauthorized.Registration.Actions.forgotPassword.goToRestorePassword')}
                </Button>

                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">
                            {t('Unauthorized.Registration.Actions.signUp')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
