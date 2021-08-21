import {mockPath, restPath} from 'Core/Config';

/** Базовый путь до моков модуля. */
export const CORE_AUTH_SETTINGS_BASE_MOCK_URL = `${mockPath}/auth/`;

/** Рест авторизации в систему */
const AUTH_AUTHORIZATION_URL = `${restPath}/auth`;

/** Рест получения csrf токена */
export const AUTH_AUTHORIZATION_GET_CSRF_TOKEN_URL = `${AUTH_AUTHORIZATION_URL}/csrf`;

/** Рест проверки авторизации по cookie */
export const AUTH_AUTHORIZATION_CHECK_BY_COOKIE_URL = `${AUTH_AUTHORIZATION_URL}/check`;

/** Рест выхода из системы */
export const AUTH_AUTHORIZATION_REGISTER_URL = `${AUTH_AUTHORIZATION_URL}/sign-up`;

/** Рест аутентификации в систему */
export const AUTH_AUTHORIZATION_LOG_IN_URL = `${AUTH_AUTHORIZATION_URL}/sign-in`;

/** Рест выхода из системы */
export const AUTH_AUTHORIZATION_LOG_OUT_URL = `${AUTH_AUTHORIZATION_URL}/log-out`;

/** Рест восстановления пароля */
export const AUTH_AUTHORIZATION_RESTORE_PASSWORD_URL = `${restPath}/restore-password`;

/** Рест смены пароля */
export const AUTH_AUTHORIZATION_CHANGE_PASSWORD_URL = `${restPath}/change-password`;

/** Название параметра запроса для сохранения пути пользователя */
export const RETURN_TO_QUERY_PARAMETER_NAME = 'returnTo';
