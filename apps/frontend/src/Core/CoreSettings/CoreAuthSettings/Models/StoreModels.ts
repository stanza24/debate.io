import type {IUser} from '@debate/common/src/Models/User';
import type {IAsyncData} from '@utils-npm/async-utils/src';
import {Reducer} from 'redux-actions';

/**
 * Стейт модуля Authorization.
 *
 * @prop user Стейт юзера.
 * @prop anyAsyncAuthProcess Стейт статуса авторизационных процессов.
 */
export interface ICoreAuthSettingsState {
    user: IAsyncData<IUser>;
    anyAsyncAuthProcess: IAsyncData<void>;
}

/**
 * Тип для описания головного редюсера модуля.
 */
export type TCoreAuthSettingsMappedReducer = Reducer<ICoreAuthSettingsState, unknown>;

/**
 * Модель редюсеров модуля Authorization.
 *
 * @prop [authorization] Общий редюсер модуля.
 */
export interface ICoreAuthSettingsMappedReducer {
    coreAuthSettings?: TCoreAuthSettingsMappedReducer;
}

/**
 * Модель стейта для импорта reduxStore.ts.
 *
 * @prop [authorization] Модель стейта модуля Authorization.
 */
export interface ICoreAuthSettingsReduxBranchState {
    coreAuthSettings?: ICoreAuthSettingsState;
}
