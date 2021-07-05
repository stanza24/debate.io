import {Router} from 'react-router-dom';
import {historyApp} from 'Core/Utils/RouterUtils/History';
import {FunctionComponent} from 'react';

/**
 * Роутер приложения
 */
export const AppRouter: FunctionComponent = () => <Router history={historyApp}>Фронтенд запустился</Router>;
