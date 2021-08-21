/**
 * Модель системных сообщений об ошибках контроллера авторизации.
 *
 * USER_IS_NOT_VERIFIED - Юзер не вирифицирован.
 * INVALID_CREDENTIALS - Неверные авторизационные данные.
 * INVALID_TOKEN - Неверный токен.
 * USER_ALREADY_EXISTS - Пользователь уже существует.
 * USER_ALREADY_VERIFIED - Пользователь уже верифицирован.
 * EMAIL_DIDNT_SENT - Сообщение не отправлено.
 * USER_IS_UNAUTHORIZED - Пользователь не авторизован.
 * INTERNAL_SERVER_ERROR - Неизвестная ошибка.
 */
export enum EAuthorizationControllerFailureMessages {
    USER_IS_NOT_VERIFIED = 'USER_IS_NOT_VERIFIED',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    INVALID_TOKEN = 'INVALID_TOKEN',
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
    USER_ALREADY_VERIFIED = 'USER_ALREADY_VERIFIED',
    EMAIL_DIDNT_SENT = 'EMAIL_DIDNT_SENT',
    USER_IS_UNAUTHORIZED = 'USER_IS_UNAUTHORIZED',
    REFRESH_TOKEN_IS_NOT_FOUND = 'REFRESH_TOKEN_IS_NOT_FOUND',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}

/**
 * Модель системных сообщений успеха контроллера авторизации.
 *
 * USER_CREATED - Пользователь создан.
 * USER_VERIFIED - Пользователь верифицирован.
 * EMAIL_SENT - Письмо отправлено.
 * SUCCESSFUL_LOGOUT - Пользователь разоавторизован.
 */
export enum EAuthorizationControllerSuccessMessages {
    USER_CREATED = 'USER_CREATED',
    USER_VERIFIED = 'USER_VERIFIED',
    EMAIL_SENT = 'EMAIL_SENT',
    SUCCESSFUL_LOGOUT = 'SUCCESSFUL_LOGOUT'
}
