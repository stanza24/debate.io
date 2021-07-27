/**
 * Модель пользователя.
 *
 * @prop id Идентификатор.
 * @prop role Роль.
 * @prop username Никнейм.
 * @prop email Почтовый ящик.
 */
export interface IBaseUserFields {
    id: string;
    role: string;
    username: string;
    email: string;
}

/**
 * Модель пользователя.
 *
 * @prop [lastName] Фамилия.
 * @prop [firstName] Имя.
 * @prop [middleName] Отчество.
 * @prop [avatar] Аватар.
 */
export interface IUser extends IBaseUserFields {
    lastName?: string;
    firstName?: string;
    middleName?: string;
    avatar?: string;
}
