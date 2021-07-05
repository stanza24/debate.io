import {RegExpPattern} from '../../Const';

/**
 * Функция возвращает результат проверки электронной почты.
 *
 * @param emailString Строка потенциально содержащая электронную почту.
 */
export const isValidEmail = (emailString: string): boolean => new RegExp(RegExpPattern.EMAIL).test(emailString);

/**
 * Функция возвращает результат проверки URL адреса.
 *
 * @param urlString Строка потенциально содержащая URL.
 */
export const isValidUrl = (urlString: string): boolean => new RegExp(RegExpPattern.URL).test(urlString);

/**
 * Функция возвращает результат проверки телефонного номера.
 *
 * @param telString Строка потенциально содержащая номер телефона в формате +* (***) ***-****.
 */
export const isValidTel = (telString: string): boolean => new RegExp(RegExpPattern.TEL).test(telString);

export const isValidInn = (innString: string): boolean => new RegExp(RegExpPattern.INN).test(innString);
