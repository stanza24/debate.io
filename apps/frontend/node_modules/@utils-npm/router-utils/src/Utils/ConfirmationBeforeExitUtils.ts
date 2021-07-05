import {isEmpty, isFunction} from 'lodash';
import {v4 as uuidV4} from 'uuid';
import {ESystemPromptMessages} from '../Enums';
import type {IConfirmation, INewConfirmation, TConfirmationStore} from '../Models/ConfirmationModels';

/**
 * Интерфейс генерируемой утилиты над History приложения.
 *
 * @prop hasActiveConfirmation Получить список активных предупреждений/
 * @prop clearConfirmationByKey Убрать из объекта предупреждений, предупреждение по confirmationKey.
 * @prop resetConfirmation Очистить объект предупреждений.
 * @prop setConfirmation Добавить предупреждение выхода с формы.
 * @prop callCustomUserConfirmation Ручной вызов предупреждения.
 * @prop getUserConfirmation Функция слушатель события history React Router.
 */
export interface IConfirmationUtils {
    hasActiveConfirmation: () => boolean;
    clearConfirmationByKey: (confirmationKey: string) => boolean;
    resetConfirmation: () => void;
    setConfirmation: (confirmationProperty?: INewConfirmation) => string;
    callCustomUserConfirmation: (doRedirect: (result: boolean) => void) => void;
    getUserConfirmation: (message: string, doRedirect: (result: boolean) => void) => void;
}

/**
 * Создаём объект кастомных утилит над History приложения для вывода нотификаций о потери данных.
 *
 * @example
 * // Чтобы подключить данную утилиту, передайте ее в ваш createHistory метод.
 * const confirmationUtils = createConfirmationUtils(callbackConfirmationCreator)
 * export const historyApp = createHashHistory({getUserConfirmation: confirmationUtils.getUserConfirmation});
 *
 * @param callbackConfirmationCreator Колбек функция, которая генерирует нотификации в приложении.
 */
export const createConfirmationUtils = (
    callbackConfirmationCreator: (doRedirect: (result: boolean) => void) => void
): IConfirmationUtils => {
    /** Массив активных предупреждений выхода с формы */
    let confirmationStore: TConfirmationStore = {};

    /** Получить список активных предупреждений */
    const hasActiveConfirmation = (): boolean => !isEmpty(confirmationStore);

    /**
     * Убрать из объекта предупреждений, предупреждение по confirmationKey.
     *
     * @param [confirmationKey] Ключ предупреждения.
     */
    const clearConfirmationByKey = (confirmationKey: string): boolean => delete confirmationStore[confirmationKey];

    /**
     * Очистить объект предупреждений.
     */
    const resetConfirmation = (): void => {
        confirmationStore = {};
    };

    /**
     * Добавить предупреждение выхода с формы.
     *
     * @param confirmationProperty Объект предупреждения.
     */
    const setConfirmation = (confirmationProperty?: INewConfirmation): string => {
        /** Генерируем новый ключ, или берем значение из типа предупреждения */
        const confirmationKey: string = uuidV4();

        /** Складываем новое предупреждение в общее хранилище */
        confirmationStore[confirmationKey] = {
            ...confirmationProperty,
            key: confirmationKey,
        };

        /** Возвращаем ключ */
        return confirmationKey;
    };

    /**
     * Вызвать все функции слушатели.
     *
     * @param doRedirect Колбек определяющий необходимость редиректа.
     */
    const callListenerConfirmation = (doRedirect: (result: boolean) => void) => {
        try {
            (Object.values(confirmationStore) as IConfirmation[]).forEach(
                ({key, listenConfirmation}: IConfirmation): void => {
                    isFunction(listenConfirmation) && listenConfirmation(key);
                }
            );
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log('listenConfirmation call errors', e);
        }

        callbackConfirmationCreator(doRedirect);
    };

    /**
     * Ручной вызов предупреждения.
     *
     * @description Используется в случаях когда сброс состояния формы не зависит от react-router,
     * а завязан на изменениях props или state компонента.
     *
     * @example
     * handleChangeStage = (newStage: EStage) => {
     *      callCustomUserConfirmation(
     *          (needRedirect) =>
     *               needRedirect &&
     *                  this.setState({stage: newStage})
     *      );
     * }
     *
     * @param doRedirect Колбек определяющий необходимость редиректа.
     */
    const callCustomUserConfirmation = (doRedirect: (result: boolean) => void): void => {
        hasActiveConfirmation() ? callListenerConfirmation(doRedirect) : doRedirect(true);
    };

    /**
     * Функция слушатель события history React Router.
     *
     * @param message Сообщение из Prompt react-router, обрабатывается только ESystemPromptMessages.VALIDATION.
     * @param doRedirect Колбек определяющий необходимость редиректа.
     */
    const getUserConfirmation = (message: string, doRedirect: (result: boolean) => void): void => {
        if (message === ESystemPromptMessages.CONFIRMATION) {
            callListenerConfirmation(doRedirect);
        }
    };

    return {
        hasActiveConfirmation,
        clearConfirmationByKey,
        resetConfirmation,
        setConfirmation,
        callCustomUserConfirmation,
        getUserConfirmation,
    };
};
