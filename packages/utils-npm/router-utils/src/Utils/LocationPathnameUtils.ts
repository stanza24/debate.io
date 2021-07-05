import {isEmpty} from 'lodash';

/**
 * Интерфейс элемента мапы параметров запроса.
 *
 * @prop name Название параметра.
 * @prop currentUrl Текущий url.
 */
interface IGetParameterByNameParam {
    name: string;
    currentUrl: string;
}

/**
 * Перейти на другую страницу.
 *
 * @param name Имя параметра.
 * @param currentUrl Текущий url.
 */
export const getParameterByName = ({name, currentUrl}: IGetParameterByNameParam): string | undefined => {
    // eslint-disable-next-line no-useless-escape
    const replacedName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${replacedName}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(currentUrl);
    if (!results) return undefined;
    if (!results[2]) return '';

    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

/**
 * Преобразуем объект query параметров в строку.
 *
 * @param queryParams Объект query параметров.
 */
export const createQueryString = (queryParams: {[paramName: string]: string}): string | undefined => {
    /** Собираем строку query-параметров. */
    if (!isEmpty(queryParams)) {
        return `?${Object.entries(queryParams)
            .map(([param, value]) => `${encodeURIComponent(param)}=${encodeURIComponent(value)}`)
            .join('&')}`;
    }

    return undefined;
};
