import {ruRU} from '@debate/common/src/Const';
// @ts-ignore
import {ConfigProvider} from 'antd';
import type {FunctionComponent} from 'react';
// @ts-ignore
import {hot} from 'react-hot-loader/root';
// @ts-ignore
import {I18nextProvider} from 'react-i18next';
// @ts-ignore
import {Provider} from 'react-redux';
import {i18next} from 'Core/Config/i18n';
import {AppRouter} from 'Routers/AppRouter';
import {store} from 'Store/store';
import 'Style/App.less';

export const App: FunctionComponent = hot(() => (
    <I18nextProvider i18n={i18next}>
        <ConfigProvider locale={ruRU}>
            <Provider store={store}>
                <AppRouter />
            </Provider>
        </ConfigProvider>
    </I18nextProvider>
));
