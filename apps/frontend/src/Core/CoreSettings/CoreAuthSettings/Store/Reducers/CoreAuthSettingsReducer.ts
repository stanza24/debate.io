import type {IUser} from '@debate/common/src/Models/User';
import type {IAsyncData} from '@utils-npm/async-utils';
import {TAsyncAction, createAsyncReducer, createMultiAsyncReducer, initAsyncParticle} from '@utils-npm/thunk-utils';
import reduceReducers from 'reduce-reducers';
import type {
    ICoreAuthSettingsMappedReducer,
    ICoreAuthSettingsState,
    TCoreAuthSettingsMappedReducer,
} from '../../Models/StoreModels';
import {ActionTypes} from '../Actions/CoreAuthSettingsActionTypes';

/**
 * Начальное состояния модуля авторизации.
 */
export const CoreAuthSettingsInitialState: ICoreAuthSettingsState = {
    user: initAsyncParticle<IUser>(),
    anyAsyncAuthProcess: initAsyncParticle<void>(),
};

/** Список всех экшенов Auth. */
export const ALL_CORE_AUTH_SETTINGS_ACTION_TYPES = Object.values(ActionTypes);

/** Редюсер асинхронной загрузки информации о пользователе. */
const asyncAuthLogInReducer = (prevState: IAsyncData<IUser>, action: TAsyncAction<IUser>) =>
    createMultiAsyncReducer<IUser>(
        [
            ActionTypes.CORE_AUTH_SETTINGS_SIGN_IN,
            ActionTypes.CORE_AUTH_SETTINGS_AUTH_CHECK,
            ActionTypes.CORE_AUTH_SETTINGS_CHANGE_PASSWORD,
        ],
        prevState,
        action,
        {
            success: (_, successAction: TAsyncAction<IUser>) => successAction.payload.response,
        }
    );

/** Редюсер асинхронного выхода пользователя из системы. */
const asyncAuthLogOutReducer = (prevState: IAsyncData<IUser>, action: TAsyncAction<IUser>) =>
    createAsyncReducer<IUser>(ActionTypes.CORE_AUTH_SETTINGS_LOG_OUT, prevState, action, {
        success: () => undefined,
    });

/**
 * Головной редусер модуля авторизации.
 */
const reducer: TCoreAuthSettingsMappedReducer = (
    prevState = CoreAuthSettingsInitialState,
    action
): ICoreAuthSettingsState => ({
    user: reduceReducers(prevState.user, asyncAuthLogInReducer, asyncAuthLogOutReducer)(prevState.user, action),

    anyAsyncAuthProcess: createMultiAsyncReducer<void>(
        ALL_CORE_AUTH_SETTINGS_ACTION_TYPES,
        prevState.anyAsyncAuthProcess,
        action
    ),
});

export const CoreAuthSettingsMappedReducer: ICoreAuthSettingsMappedReducer = {coreAuthSettings: reducer};
