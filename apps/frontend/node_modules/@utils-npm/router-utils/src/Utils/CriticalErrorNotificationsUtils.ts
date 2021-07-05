import {isEmpty, isFunction} from 'lodash';
import {IConfirmationUtils} from './ConfirmationBeforeExitUtils';
import {IHistoryUtils} from './CustomRouterUtils';

/**
 * Описание типа для вызова критической ошибки.
 */
type TShowCriticalErrorCallback<TErrorType> = (errorPageModalProps?: IErrorPageModalProps<TErrorType>) => void;

/**
 * Кастомнная функция для вызова вместо routerUtils.reload.
 */
type TCustomReloadCallback = () => void;

/**
 * Модель прокидываемых в метод свойств.
 *
 * @prop [customReload] Кастомная функция перезагрузки. (Используется когда не нужна перезагрузка роута или страницы)
 * @prop [isReloadRoute] Перезагружать роут вместо страницы. (Сохраняем принцип СПА)
 * @prop [error] Объект ошибки.
 */
export interface IErrorPageModalProps<TErrorType> {
    customReload?: TCustomReloadCallback;
    isReloadRoute?: boolean;
    error?: TErrorType;
}

/**
 * Модель прокидываемых в метод свойств.
 *
 * @prop callbackCloseNotification Колбек закрытия модального окна, с результатом.
 * @prop [errors] Массив ошибок.
 * @prop [isUpdate] Перезагружать роут вместо страницы. (Сохраняем принцип СПА)
 */
export interface ICallbackShowNotificationProps<TErrorType> {
    callbackCloseNotification: (result: boolean) => void;
    errors: TErrorType[];
    isUpdate?: boolean;
}

/**
 * Модель прокидываемых в метод свойств.
 *
 * @prop [customReload] Кастомная функция перезагрузки. (Используется когда не нужна перезагрузка роута или страницы)
 * @prop [isReloadRoute] Перезагружать роут вместо страницы. (Сохраняем принцип СПА)
 * @prop [error] Объект ошибки.
 */
export interface INotificationDemonstratorProps<TErrorType> {
    callbackShowNotification: (props: ICallbackShowNotificationProps<TErrorType>) => void;
    routerUtils: IHistoryUtils;
    confirmationUtils?: IConfirmationUtils;
    baseUrl?: string;
}

/**
 * Создаём сигнлтон функции открытия модального окна о кри
 */
export const createCriticalErrorNotificationsDemonstrator = <TErrorType>({
    callbackShowNotification,
    routerUtils,
    confirmationUtils,
    baseUrl,
}: INotificationDemonstratorProps<TErrorType>): TShowCriticalErrorCallback<TErrorType> => {
    let isReloadRoute = false;
    let isErrorShowed = false;
    let customReloads: TCustomReloadCallback[] = [];
    let errors: TErrorType[] = [];

    const callbackCloseNotification = (result: boolean) => {
        if (result) {
            // Удаляем все предупреждения (если переходим на главную, нам не нужно показывать модальное окно о потере данных)
            confirmationUtils?.resetConfirmation();
            routerUtils.redirect(baseUrl || '/');
        } else {
            /**
             * Если идет попытка перезагрузки страницы, то всегда стараемся действовать по минимальному сценарию.
             *
             * Например, если есть customReload колбеки, стараемся выполнить в первую очередь именно их, вполне возможно
             * что их выполнения хватит чтобы стабилизировать систему, если же ручных обработчиков нету, то перезагружаем
             * страницу пользователя.
             *
             * Перезагрузка так же идёт по минимальному сценарию, если есть хотябы одна ошибка, где предполагается что хватит
             * только перезагрузки роута (размонтировать компонент и смонтировать его обратно), то выполняем именно эту операцию,
             * в противном случае, перезагружаем всю страницу пользователя.
             */
            // eslint-disable-next-line no-lonely-if
            if (!isEmpty(customReloads)) {
                customReloads.forEach((customReload) => {
                    isFunction(customReload) && customReload();
                });
            } else {
                routerUtils.reload(!isReloadRoute);
            }
        }
        isErrorShowed = false;
        customReloads = [];
        errors = [];
    };

    /**
     * Вызов модального окна ошибки на странице.
     *
     * @description Используется для вызова модального окна, в случае если произошла непредвиденная ошибка на странице,
     * форма предлагает перезагрузить страницу или вернуться на главную страницу приложения.
     *
     * @param [errorPageModalProps] Кастомные проперти модального окна.
     */
    return (errorPageModalProps?: IErrorPageModalProps<TErrorType>): void => {
        if (errorPageModalProps?.error) {
            errors.push(errorPageModalProps.error);
        }

        if (errorPageModalProps?.customReload) {
            customReloads.push(errorPageModalProps.customReload);
        }

        if (!isReloadRoute && errorPageModalProps?.isReloadRoute) {
            isReloadRoute = true;
        }

        callbackShowNotification({errors, callbackCloseNotification, isUpdate: !isErrorShowed});

        isErrorShowed = true;
    };
};
