import type {
    ICoreAuthSettingsMappedReducer,
    ICoreAuthSettingsReduxBranchState,
} from 'Core/CoreSettings/CoreAuthSettings/Models/StoreModels';

/**
 * Модель редюсеров приложения.
 */
export interface IAppMappedReducerState extends ICoreAuthSettingsMappedReducer {}

/**
 * Модель стейта приложения.
 */
export interface IAppState extends ICoreAuthSettingsReduxBranchState {}
