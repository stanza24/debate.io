import {UserOutlined} from '@ant-design/icons/lib';
import {InputWithCharactersCountLabel} from '@debate/common/src/Components';
import {INPUT_RESTRICTION_XS} from '@debate/common/src/Const';
import {Button, Card, Col, Form, Row, Typography} from 'antd';
import {FunctionComponent, useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {ROUTE} from '../../../Const';
import {RouterUtils} from '../../../Utils';
import type {IRestorePasswordData} from '../Models';
import {useAuthorizationActions} from '../Store/Hooks/useAuthorizationActions';
import {getEmailValidationRules} from '../Utils/ValidationUtils';

/** Компонент формы пароля. */
export const RestorePasswordForm: FunctionComponent = () => {
    const {restorePassword} = useAuthorizationActions();
    const {t} = useTranslation();

    const emailValidationRules = useMemo(() => getEmailValidationRules(t), [t]);

    const handleRestore = ({email}: IRestorePasswordData) => restorePassword(email);

    const handleRedirectToAuthorizationForm = useCallback(
        () =>
            RouterUtils.redirect(ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH, {
                search: RouterUtils.location().search,
            }),
        []
    );

    return (
        <Card
            title={<Typography.Title level={4}>{t('Unauthorized.RestorePassword.title')}</Typography.Title>}
            className="unauthorized-form"
        >
            <Form layout="vertical" onFinish={handleRestore}>
                <Form.Item key="email" name="email" label={t('Unauthorized.Form.email')} rules={emailValidationRules}>
                    <InputWithCharactersCountLabel
                        maxLength={INPUT_RESTRICTION_XS}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder={t('Unauthorized.Form.email_placeholder')}
                    />
                </Form.Item>

                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">
                            {t('Unauthorized.RestorePassword.Actions.restore')}
                        </Button>
                    </Col>
                </Row>

                <Row gutter={4} align="middle">
                    <Col>
                        <Typography.Text>
                            {t('Unauthorized.RestorePassword.Actions.goBackToToAuthorization.title')}
                        </Typography.Text>
                    </Col>
                    <Col>
                        <Button type="link" onClick={handleRedirectToAuthorizationForm}>
                            {t('Unauthorized.RestorePassword.Actions.goBackToToAuthorization.goToAuthorization')}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Card>
    );
};
