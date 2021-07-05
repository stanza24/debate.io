import {isValidEmail} from '../ValidationUtils';

/**
 * Функция, форматирующая количество в байт в формат NUM SIZE
 *
 * @param bytes количество байт
 * @param decimals символы после запятой
 */

export const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

/**
 * Функция возвращает валидную электронную почту, или undefined.
 *
 * @param emailString Строка потенциально содержащая электронную почту.
 */
export const getValidEmail = (emailString: string): string | undefined => {
    const emailStringTrim: string = emailString.trim();

    return isValidEmail(emailStringTrim) ? emailStringTrim : undefined;
};

/**
 * Функция разделяет число пробелами, для красивой визуализации.
 *
 * @param x число которое требуется разделить пробелами.
 * @param separator разделитель.
 */
export const prettyNumber = (x: number, separator = ' '): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};
