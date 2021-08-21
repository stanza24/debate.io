/**
 * Модель данных запроса регистрации.
 *
 * @prop email Электронная почта пользователя.
 * @prop password Пароль.
 */
export interface ISignUpData {
    email: string;
    password: string;
}

/**
 * Модель данных запроса аутентификации.
 *
 * @prop login Логин.
 * @prop password Пароль.
 */
export interface IAuthData {
    login: string;
    password: string;
}

/**
 * Модель данных запроса восстановления пароля.
 *
 * @prop email Электронная почта пользователя.
 */
export interface IRestorePasswordData {
    email: string;
}
