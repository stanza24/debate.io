import type {FunctionComponent} from 'react';
import {EAccountSection} from '../Enums/AccounEnum';
import {Col, Image, Row, Tabs, Typography} from 'antd';
import {useSelector} from 'react-redux';
import {userSelector} from 'Core/CoreSettings/CoreAuthSettings/Store/Selectors/CoreAuthSettings';
import {useCallback} from 'react';
import {RouterUtils} from 'Core/Utils/RouterUtils';
import {ROUTE} from 'Core/Const';
import {useTranslation} from 'react-i18next';

/**
 * Модель прокидываемых в компонент свойств.
 *
 * @prop section Активный раздел профиля.
 */
interface IProps {
    section: string;
}

/** Компонент панели вкладок профиля. */
export const AccountTabbedPane: FunctionComponent<IProps> = ({section}: IProps) => {
    const {user} = useSelector(userSelector);
    const {t} = useTranslation();

    /** Обработчик клика на вкладку этапа анкеты. */
    const handleSetActiveTab = useCallback((section: EAccountSection): void => {
        RouterUtils.redirect(ROUTE.CLIENT.ACCOUNT.SECTIONS.PATH, {
            params: {
                section,
            },
        });
    }, []);

    return (
        <div>
            <Row align="middle" gutter={16}>
                {user.avatar && (
                    <Col>
                        <Image
                            preview={{
                                mask: null,
                            }}
                            width={50}
                            src={user.avatar}
                            alt="image"
                            className="account-page-avatar-preview"
                        />
                    </Col>
                )}
                <Col>
                    <Typography.Title level={1}>
                        {t('Account.Components.AccountTabbedPane.fullName', {
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                        })}
                    </Typography.Title>
                </Col>
                <Col>
                    <Typography.Text type="secondary">
                        {t('Account.Components.AccountTabbedPane.userName', {
                            userName: user?.username,
                        })}
                    </Typography.Text>
                </Col>
            </Row>
            <Tabs activeKey={section} onChange={handleSetActiveTab}>
                {Object.values(EAccountSection).map((section: EAccountSection) => (
                    <Tabs.TabPane
                        key={section.toLowerCase()}
                        tab={
                            <Typography.Text>
                                {t('Account.Components.AccountTabbedPane.sectionTab', {
                                    context: section,
                                })}
                            </Typography.Text>
                        }
                    />
                ))}
            </Tabs>
        </div>
    );
};
