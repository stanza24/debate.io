import {combineReducers} from 'redux';
import {CoreAuthSettingsMappedReducer} from 'Core/CoreSettings/CoreAuthSettings/Store/Reducers/CoreAuthSettingsReducer';

/**
 * Набор редюсеров приложения.
 *
 * @prop CoreAuthSettingsMappedReducer Головной редюсер модуля авторизации.
 */
const reduxStore = {
    ...CoreAuthSettingsMappedReducer,
};

/**
 * @desc соединяем в головной редюсер приложения
 */
export const rootReducer = combineReducers(reduxStore);
