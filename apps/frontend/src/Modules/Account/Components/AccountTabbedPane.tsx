import {Col, Image, Row, Tabs, Typography} from 'antd';
import type {FunctionComponent} from 'react';
import {useCallback} from 'react';
import {ROUTE} from 'Core/Const';
import {userSelector} from 'Core/CoreSettings/CoreAuthSettings/Store/Selectors/CoreAuthSettingsSelector';
import {RouterUtils} from 'Core/Utils/RouterUtils';
import {EAccountSection} from '../Enums/AccounEnum';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

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
    const user = useSelector(userSelector);
    const {t} = useTranslation();

    /** Обработчик клика на вкладку этапа анкеты. */
    const handleSetActiveTab = useCallback((newSection: EAccountSection): void => {
        RouterUtils.redirect(ROUTE.CLIENT.ACCOUNT.SECTIONS.PATH, {
            params: {
                section: newSection,
            },
        });
    }, []);

    return (
        <div>
            <Row align="middle" gutter={16}>
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
                        src={user.profile.avatar?.thumbnail || 'https://img.icons8.com/ios/50/000000/user--v1.png'}
                        alt="image"
                        className="account-page-avatar-preview"
                    />
                </Col>
                <Col>
                    <Typography.Title level={1}>
                        {t('Account.Components.AccountTabbedPane.fullName', {
                            firstName: user.profile.firstName,
                            lastName: user.profile.lastName,
                        })}
                    </Typography.Title>
                </Col>
                <Col>
                    <Typography.Text type="secondary">
                        {t('Account.Components.AccountTabbedPane.userName', {
                            userName: user.username,
                        })}
                    </Typography.Text>
                </Col>
            </Row>
            <Tabs activeKey={section} onChange={handleSetActiveTab}>
                {Object.values(EAccountSection).map((sec: EAccountSection) => (
                    <Tabs.TabPane
                        key={sec.toLowerCase()}
                        tab={
                            <Typography.Text>
                                {t('Account.Components.AccountTabbedPane.sectionTab', {
                                    context: sec,
                                })}
                            </Typography.Text>
                        }
                    />
                ))}
            </Tabs>
        </div>
    );
};
