import {IUserBaseFields} from '../../Models/BaseModels';

/**
 * Возвращает ФИО в формате (Фамилия Имя Отчество)
 *
 * @param user объект с фамилией именем отчеством
 */
export const getFullName = ({username, lastName, firstName, middleName}: IUserBaseFields): string => {
    if (lastName || firstName || middleName) {
        return [lastName, firstName, middleName].filter((item) => !!item).join(' ');
    }

    return username || '';
};

/**
 * Возвращает ФИО в формате (Фамилия И. О.)
 *
 * @param user объект с фамилией именем отчеством
 */
export const getSurnameWithInitials = ({username, lastName, firstName, middleName}: IUserBaseFields): string => {
    if (lastName || firstName || middleName) {
        return `${lastName || ''}${firstName ? ` ${firstName[0]}.` : ''}${middleName ? ` ${middleName[0]}.` : ''}`;
    }

    return username || '';
};

/**
 * Возвращает ФИО в формате (Фамилия Имя)
 *
 * @param user объект с фамилией именем
 */
export const getSurnameWithName = ({lastName, firstName}: IUserBaseFields): string =>
    `${lastName || ''}${firstName ? ` ${firstName}` : ''}`;
