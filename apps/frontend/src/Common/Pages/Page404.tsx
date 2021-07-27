import type {FunctionComponent} from 'react';
import {Result} from 'antd';
import {ROUTE} from 'Core/Const/RouterConst';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

export const Page404: FunctionComponent = () => {
    const {t} = useTranslation();

    return (
        <Result
            status="404"
            title={t('Layout.Page404.title')}
            subTitle={t('Layout.Page404.subTitle')}
            extra={<Link to={ROUTE.CLIENT.ACCOUNT.PATH}>{t('Layout.Page404.linkText')}</Link>}
        />
    );
};
