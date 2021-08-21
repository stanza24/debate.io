import {RegExpPattern} from '@utils-npm/helper-utils/src';
import {FormInstance} from 'antd';
import {TFunction} from 'i18next';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Rule} from 'rc-field-form/lib/interface';
import {EStrengthPassword} from '../Enum';

/* eslint-disable prettier/prettier */
// prettier-ignore
const phohibitedPatterns = [
    '1234567890-=qwertyuiop[]asdfghjkl;\'zxcvnm,./',
    '/.,mnbvcxz\';lkjhgfdsa][poiuytrewq=-0987654321',
    '1qaz2wsx3edc4rfv5tgb6yhn7ujm8ik,9ol.0p;/-[\'=]',
    'zaq1xsw2cde3vfr4bgt5nhy6mju7,ki8.lo9/;p0\'[-]=',
    '741852963147258369',
    'qazwsxedcrfvtgbyhnujmik,ol.p;/[\']',
    'zaqxswcdevfrbgtnhymju,ki.lo/;p\'[]',
    '1q2w3e4r5t6y7u8i9o0p-[=]azsxdcfvgbhnjmk,l.;/\'',
    '\'/;.l,kmjnhbgvfcdxsza]=[-p0o9i8u7y6t5r4e3w2q1',
    '111222333444555666777888999000---===aaasssdddfffggghhhjjjkkklll;;;\'\'\'zzzxxxcccvvvbbbcccvvvbbbnnnmmm,,,...///'
]

/**
 * Функция проверяет пароль на идущие пордяд символы.
 *
 * @param password Пароль.
 */
export const checkForProhibitedPattern = (password: string): boolean => {
    let left = 0;
    let right = 3;
    while (password[left] && password[right - 1]) {
        for (let i = 0; i < phohibitedPatterns.length; i++) {
            if (phohibitedPatterns[i].includes(password.slice(left, right))) return true;
        }
        left += 1;
        right += 1;
    }
    return false;
};

/**
 * Генератор правил валидации имени пользователя.
 *
 * @param t Функция интернационализации.
 */
export const getFreeFieldValidationRules = <TFormData>(t: TFunction): Rule[] => [
    (_formInstance: FormInstance<TFormData>) => ({
        validator(_, value: string) {
            if (value) {
                switch (true) {
                    case value.length < 2:
                        return Promise.reject(t('Unauthorized.Validation.freeField.minCount'));
                    case value.includes(' '):
                        return Promise.reject(t('Unauthorized.Validation.freeField.hasSpaceSymbols'));
                    case new RegExp(RegExpPattern.RUSSIAN_SYMBOLS).test(value):
                        return Promise.reject(t('Unauthorized.Validation.login.ruSymbols'));
                    default:
                        return Promise.resolve();
                }
            }

            return Promise.reject(t('Unauthorized.Validation.freeField.empty'));
        },
    }),
];

/**
 * Генератор правил валидации имени пользователя.
 *
 * @param t Функция интернационализации.
 */
export const getUsernameValidationRules = <TFormData extends {login: string}>(t: TFunction): Rule[] => [
    (_formInstance: FormInstance<TFormData>) => ({
        validator(_, value: string) {
            if (value) {
                switch (true) {
                    case value.length < 2:
                        return Promise.reject(t('Unauthorized.Validation.login.minCount'));
                    case value.includes(' '):
                        return Promise.reject(t('Unauthorized.Validation.login.hasSpaceSymbols'));
                    case new RegExp(RegExpPattern.RUSSIAN_SYMBOLS).test(value):
                        return Promise.reject(t('Unauthorized.Validation.login.ruSymbols'));
                    default:
                        return Promise.resolve();
                }
            }

            return Promise.reject(t('Unauthorized.Validation.login.empty'));
        },
    }),
];

/**
 * Генератор правил валидации электронной почты пользователя.
 *
 * @param t Функция интернационализации.
 */
export const getEmailValidationRules = <TFormData extends {login: string}>(t: TFunction): Rule[] => [
    (_formInstance: FormInstance<TFormData>) => ({
        validator(_, value: string) {
            if (value) {
                switch (true) {
                    case !new RegExp(RegExpPattern.EMAIL).test(value):
                        return Promise.reject(t('Unauthorized.Validation.email.incorrect'));
                    default:
                        return Promise.resolve();
                }
            }

            return Promise.reject(t('Unauthorized.Validation.email.empty'));
        },
    }),
];

/**
 * Функция проверяет мощность пароля.
 *
 * @param password Пароль.
 */
export const checkStrengthPassword = (password: string): EStrengthPassword => {
    let strength = 0;

    const regexPasswordArray = [
        RegExpPattern.LOWER_LAT,
        RegExpPattern.UPPER_LAT,
        RegExpPattern.NUMBERS,
        RegExpPattern.SPECIAL_SYMBOLS,
    ];

    regexPasswordArray.forEach((regex) => {
        if (new RegExp(regex).test(password)) {
            strength += 1;
        }
    });

    return strength;
};

/**
 * Дополнительные параметры валидации.
 *
 * @prop [testStrength] Проверять силу пароля.
 * @prop [equalByFieldName] Проверять на равенство полю.
 */
export interface IPasswordValidationParams<TFormData> {
    testStrength?: false | EStrengthPassword;
    equalByFieldName?: keyof TFormData;
}

/**
 * Генератор правил валидации старого пароля пользователя.
 *
 * @param t Функция интернационализации.
 */
export const getOldPasswordlValidationRules = <TFormData extends {password: string}>(t: TFunction): Rule[] => [
    (_formInstance: FormInstance<TFormData>) => ({
        validator(_, value: string) {
            if (value) {
                return Promise.resolve();
            }

            return Promise.reject(t('Unauthorized.Validation.password.empty'));
        },
    }),
];

/**
 * Генератор правил валидации пароля пользователя.
 *
 * @param t Функция интернационализации.
 * @param params Проверка силы пароля.
 */
export const getPasswordValidationRules = <TFormData>(
    t: TFunction,
    params: IPasswordValidationParams<TFormData> = {
        testStrength: EStrengthPassword.STRONG,
        equalByFieldName: undefined,
    }
): Rule[] => [
    (formInstance: FormInstance<TFormData>) => ({
        validator(_, value: string) {
            if (value) {
                switch (true) {
                    case value.length < 6:
                        return Promise.reject(t('Unauthorized.Validation.password.minCount'));
                    case value.includes(' '):
                        return Promise.reject(t('Unauthorized.Validation.password.hasSpaceSymbols'));
                    case new RegExp(RegExpPattern.RUSSIAN_SYMBOLS).test(value):
                        return Promise.reject(t('Unauthorized.Validation.password.ruSymbols'));
                    case params.testStrength && checkStrengthPassword(value) < params.testStrength + 1:
                        return Promise.reject(
                            t('Unauthorized.Validation.password.veryWeek', {
                                context: String(params.testStrength),
                            })
                        );
                    case params.equalByFieldName &&
                        formInstance.getFieldValue(params.equalByFieldName)?.length > 0 &&
                        formInstance.getFieldValue(params.equalByFieldName) !== value:
                        return Promise.reject(t('Unauthorized.Validation.password.isNotEqual'));
                    case checkForProhibitedPattern(value):
                        return Promise.reject(t('Unauthorized.Validation.password.restrictedPattern'));
                    default:
                        return Promise.resolve();
                }
            }

            return Promise.reject(t('Unauthorized.Validation.login.empty'));
        },
    }),
];

/**
 * Генератор правил валидации повтора пароля.
 *
 * @param t Функция интернационализации.
 * @param equalFieldName Имя поля пароля.
 */
export const getRepeatPasswordValidationRules = (t: TFunction, equalFieldName = 'password'): Rule[] => [
    ({getFieldValue}) => ({
        validator(_, value) {
            if (!value || getFieldValue(equalFieldName) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error(t('Unauthorized.Validation.password.isNotEqual')));
        },
    }),
];
