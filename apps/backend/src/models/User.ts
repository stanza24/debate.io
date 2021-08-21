// /**
//  * Модель профиля пользователя.
//  *
//  * @prop [lastName] Фамилия.
//  * @prop [firstName] Имя.
//  * @prop [middleName] Отчество.
//  * @prop [countryName] Страна.
//  * @prop [aboutMe] Обо мне.
//  * @prop [favCategories] Любимые категории.
//  * @prop [avatar] Аватар.
//  */
// export interface IUserProfile {
//     lastName?: string;
//     firstName?: string;
//     middleName?: string;
//     countryName?: string;
//     aboutMe?: string;
//     favCategories?: string[];
//     avatar?: IUIImage;
// }
//
// /**
//  * Модель прогресса пользователя.
//  *
//  * @prop rank Уровень аккаунта.
//  * @prop exp Кол-во опыта.
//  * @prop expToNewRank Кол-во опыта до следующего уровня.
//  */
// export interface IUserProgress {
//     rank: 0;
//     exp: 0;
//     expToNewRank: 10;
// }
//
// /**
//  * Модель достижений пользователя.
//  *
//  * @prop done Завершенные достижения.
//  * @prop total Общее кол-во достижений.
//  */
// export interface IUserAchievements {
//     done: IAchievement[];
//     total: number;
// }

/**
 * Модель пользователя.
 *
 * @prop _id Идентификатор.
 * @prop role Роль.
 * @prop username Никнейм.
 * @prop email Электронная почта.
 * @prop isVerified Статус верификации.
 * @prop profile Профиль.
 * @prop achievements Система достижений.
 */
export interface IUser {
    _id: string;
    role: string;
    username: string;
    email: string;
    isVerified: boolean;
    password: string;
    // profile: IUserProfile;
    // progress: IUserProgress;
    // achievements: IUserAchievements;
}
