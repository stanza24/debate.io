import type {IAsyncData, IErrorsResult} from '@utils-npm/async-utils/src';
import {EProcessStatus} from '@utils-npm/async-utils/src';
import {isFunction} from 'lodash';
import type {Action} from 'redux-actions';
import {EProcessActionTypeSuffixes} from '../Enums';
import {TAsyncAction} from '../Models/ActionDataModels';
import type {IReducerGroupPrepare, IStandardAsyncReducer} from '../Models/ReducerModels';

/**
 * Небольшой хелпер для получения функции генерации нового состояния.
 *
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 */
const createAsyncDataHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    prevState: IAsyncData<TStateData>,
    action: TAsyncAction<TServiceData, TPayload>
) =>
    /**
     * Функция для создания нового состояния.
     *
     * @param status Предыдущее состояние.
     * @param [prepareCallback] Предобработчик данных.
     * @param [errors] Ошибки при выполнении запроса.
     */
    (
        status: EProcessStatus,
        prepareCallback?: IStandardAsyncReducer<TStateData, TServiceData, TPayload>,
        errors?: IErrorsResult
    ): IAsyncData<TStateData> => ({
        status,
        data: prepareCallback ? prepareCallback(prevState, action) : prevState.data,
        errors,
    });

/**
 * Хелпер для вызова кастомных редюсеров в createAsyncReducer и createMultiAsyncReducer.
 *
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 * @param [prepare] Предобработчики данных для этапов ЖЦ запроса.
 */
const customPrepareReducerHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    prevState: IAsyncData<TStateData>,
    action: Action<TPayload> | TAsyncAction<TServiceData | IErrorsResult, TPayload>,
    prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
): IAsyncData<TStateData> | void => {
    const {custom} = prepare;

    if (custom && action.type in custom && isFunction(custom[action.type])) {
        return custom[action.type](prevState, action);
    }

    return undefined;
};

/**
 * Хелпер отрезает от экшен тайпа суффикс асинхронного процесса запроса данных из EProcessActionTypeSuffixes.
 *
 * @param actionType - Экшен тайп из которого требуется вырезать суффикс.
 */
const cutAsynPrefix = (actionType: string): string => {
    // Заберем все строки из нашего енама
    const suffixes: string[] = Object.values(EProcessActionTypeSuffixes);

    // Используем for, чтобы иметь возможность выйти из цикла когда дальнейший поиск не имеет смысла.
    for (let i = 0, n = suffixes.length; i < n; i++) {
        const suffix: string = suffixes[i];

        /**
         * Смотрим что получится если из текущего экшен тайпа забрать строку длинной в текущий суффикс
         * разумно выдвинуть гипотезу что если суффикс и подстрока равны, то мы избавили строку от суффикса.
         */
        if (actionType.substr(actionType.length - suffix.length) === suffix) {
            return actionType.substr(0, actionType.length - suffix.length);
        }
    }

    //  Если ничего не нашли, отдаём экшен тайп дальше.
    return actionType;
};

/**
 * Хелпер для обработки цепочки редюсеров в createAsyncReducer и createMultiAsyncReducer.
 *
 * Функция обрабатывает следующую цепочку экшенов:
 * EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE
 *
 * @param actionType Тип экшена (без префиксов).
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 * @param [prepare] Предобработчики данных для этапов ЖЦ запроса.
 */
const chainPrepareReducerHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    actionType: string,
    prevState: IAsyncData<TStateData>,
    action: TAsyncAction<TServiceData | IErrorsResult, TPayload>,
    prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
): IAsyncData<TStateData> | void => {
    const {begin, success, failure} = prepare;

    switch (action.type) {
        case actionType + EProcessActionTypeSuffixes.BEGIN:
            return createAsyncDataHelper<TStateData, never, TPayload>(
                prevState,
                action as TAsyncAction<never, TPayload>
            )(EProcessStatus.RUNNING, begin);
        case actionType + EProcessActionTypeSuffixes.SUCCESS:
            return createAsyncDataHelper<TStateData, TServiceData, TPayload>(
                prevState,
                action as TAsyncAction<TServiceData, TPayload>
            )(EProcessStatus.SUCCESS, success);
        case actionType + EProcessActionTypeSuffixes.FAILURE:
            return createAsyncDataHelper<TStateData, IErrorsResult, TPayload>(
                prevState,
                action as TAsyncAction<IErrorsResult, TPayload>
            )(EProcessStatus.FAIL, failure, action.payload.response as IErrorsResult);
    }

    return undefined;
};

/**
 * Создание редюсера для обработки типового процесса получения асинхронных данных.
 *
 * Функция обрабатывает следующую цепочку экшенов:
 * EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE.
 *
 * @param actionType Тип экшена (без префиксов).
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 * @param [prepare] Предобработчики данных для этапов ЖЦ запроса.
 */
export const createAsyncReducer = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    actionType: string,
    prevState: IAsyncData<TStateData>,
    action: Action<TPayload> | TAsyncAction<TServiceData | IErrorsResult, TPayload>,
    prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
): IAsyncData<TStateData> =>
    customPrepareReducerHelper<TStateData, TServiceData, TPayload>(prevState, action, prepare) ||
    chainPrepareReducerHelper<TStateData, TServiceData, TPayload>(
        actionType,
        prevState,
        action as TAsyncAction<TServiceData | IErrorsResult, TPayload>,
        prepare
    ) ||
    prevState;

/**
 * Создание редюсера для обработки типового процесса получения асинхронных данных.
 *
 * Функция обрабатывает следующую цепочку экшенов:
 * EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE.
 *
 * @description Дабы не мучать наш chainPrepareReducerHelper вероятно огромным массивом экшен тайпов, будем строить логику
 * от предположения что текущий экшен тайп без суффикса стандартных асинхронных экшен тайпов находится в списке
 * доступных нам экшен тайпов, и если это так, то возьмём за основу экшентайпа .
 *
 * @param actionTypes Типы экшенов (без префиксов).
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 * @param [prepare] Предобработчики данных для этапов ЖЦ запроса.
 */
const multyChainPrepareReducerHelper = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    actionTypes: string[],
    prevState: IAsyncData<TStateData>,
    action: TAsyncAction<TServiceData | IErrorsResult, TPayload>,
    prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
): IAsyncData<TStateData> | void => {
    // Будем идти от гипотезы что текущий экшен тайп может быть в массиве actionTypes
    const actionTypeWithOutPrefix = cutAsynPrefix(action.type);

    if (actionTypes.includes(actionTypeWithOutPrefix)) {
        return chainPrepareReducerHelper<TStateData, TServiceData, TPayload>(
            actionTypeWithOutPrefix,
            prevState,
            action,
            prepare
        );
    }
    return undefined;
};

/**
 * Создание редюсера для обработки типового процесса получения асинхронных данных.
 *
 * Функция обрабатывает следующую цепочку экшенов:
 * EActionTypeSuffixes.BEGIN -> EActionTypeSuffixes.SUCCESS || EActionTypeSuffixes.FAILURE.
 *
 * @param actionTypes Типы экшенов (без префиксов).
 * @param prevState Предыдущее состояние.
 * @param action Экшен, передаваемый в редюсеры.
 * @param [prepare] Предобработчики данных для этапов ЖЦ запроса.
 */
export const createMultiAsyncReducer = <TStateData, TServiceData = TStateData, TPayload = unknown>(
    actionTypes: string[],
    prevState: IAsyncData<TStateData>,
    action: Action<TPayload> | TAsyncAction<TServiceData | IErrorsResult, TPayload>,
    prepare: IReducerGroupPrepare<TStateData, TServiceData, TPayload> = {}
): IAsyncData<TStateData> =>
    customPrepareReducerHelper<TStateData, TServiceData, TPayload>(prevState, action, prepare) ||
    multyChainPrepareReducerHelper<TStateData, TServiceData, TPayload>(
        actionTypes,
        prevState,
        action as TAsyncAction<TServiceData | IErrorsResult, TPayload>,
        prepare
    ) ||
    prevState;

/**
 * Функция хелпер для иницилизации асинхронных данных.
 *
 * @param [data] Первоначальные данные.
 */
export const initAsyncParticle = <TStateData>(data: TStateData | null = null): IAsyncData<TStateData> => ({
    data,
    errors: undefined,
    status: EProcessStatus.IDLE,
});
