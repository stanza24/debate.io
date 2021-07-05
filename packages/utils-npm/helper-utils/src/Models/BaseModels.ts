/**
 * Модель базовых полей пользователя
 *
 * @prop username Логин пользователя.
 * @prop lastName Фамилия.
 * @prop firstName Имя.
 * @prop [middleName] Отчество.
 */
export interface IUserBaseFields {
    username?: string;
    lastName?: string;
    firstName?: string;
    middleName?: string;
}
