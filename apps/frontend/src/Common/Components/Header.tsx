import {Button, PageHeader, Row} from 'antd';
import type {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {ROUTE} from 'Core/Const';
import {useCallback} from 'react';
import {RouterUtils} from 'Core/Utils/RouterUtils';

/** Шапка личного кабинета сотрудника банка. */
export const Header: FunctionComponent = () => {
    const {t} = useTranslation();

    /** Обработчик кнопки перехода к профилю. */
    const handleRedirectToProfile = useCallback(() => RouterUtils.redirect(ROUTE.CLIENT.ACCOUNT.PROFILE.PATH), []);

    return (
        <PageHeader
            title={
                <Link className="bank-office-logo" to={ROUTE.CLIENT.LAYOUT_PATH}>
                    {t('Layout.Header.logo')}
                </Link>
            }
            extra={
                <Row>
                    <Button type="default" onClick={handleRedirectToProfile}>
                        {t('Layout.Header.buttons.toProfile')}
                    </Button>
                </Row>
            }
            className="client-layout-header"
        />
    );
};
