import {ChangeEvent} from 'react';

/**
 * Объявляем и экспортируем тип для описания обрабатываемого евента Ant.
 */
export type TEventType = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>;

/**
 * Возвращает строку из события onChange для Input
 *
 * @param event Событие изменения инпута
 */
export const transformEventToValue = (event: TEventType): string => event.target.value;

/**
 * Функция возвращает случайное число от 0 до max.
 *
 * @param [min] Минимальное значение случайного положительного числа - по умолчанию 100.
 * @param [max] Максимальное значение случайного положительного числа - по умолчанию 100.
 */
export const randomInteger = (min = 0, max = 100): number => Math.round(Math.random() * (max - min) + min);

/**
 * Функция возвращает отклоняющийся с задержкой промис.
 *
 * @param delayMs Количество миллисекунд задержки.
 */
export const getThrottledRejectingPromise = (delayMs = 10000): Promise<never> =>
    new Promise((_, reject) => setTimeout(reject, delayMs));

/**
 * Функция для сравнивания двух массивов.
 *
 * @description Функия возвращает true, если элементы в обоих массивах совпадают (не учитывается их порядок)
 *
 * @param firstArray Первый массив.
 * @param secondArray Второй массив.
 */
export const isArrayElementEqual = (firstArray: string[], secondArray: string[]): boolean =>
    firstArray.length > secondArray.length
        ? firstArray.every((item) => secondArray.includes(item))
        : secondArray.every((item) => firstArray.includes(item));

/**
 * Функция проверки пересечения массивов.
 *
 * @description Функия возвращает true, если элементы содержатся в другом массиве.
 *
 * @param firstArray Первый массив.
 * @param secondArray Второй массив.
 */
export const isArrayElementContains = (firstArray: string[], secondArray: string[]): boolean =>
    firstArray.length > secondArray.length
        ? firstArray.some((item) => secondArray.includes(item))
        : secondArray.some((item) => firstArray.includes(item));

/**
 * Функция получения значения cookie.
 *
 * @param name Название cookie.
 */
export const getCookie = (name: string): string | undefined => {
    const matches = document.cookie.match(
        // eslint-disable-next-line no-useless-escape
        new RegExp(`(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
};
