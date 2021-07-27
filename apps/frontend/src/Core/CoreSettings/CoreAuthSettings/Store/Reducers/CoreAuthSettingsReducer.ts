import reduceReducers from 'reduce-reducers';
import type {
    ICoreAuthSettingsMappedReducer,
    ICoreAuthSettingsState,
    TCoreAuthSettingsMappedReducer,
} from '../../Models/StoreModels';
import {initAsyncParticle} from '@utils-npm/thunk-utils';
import type {IUser} from '@debate/common/src/Models/User';

/**
 * Начальное состояния модуля авторизации.
 */
export const CoreAuthSettingsInitialState: ICoreAuthSettingsState = {
    user: initAsyncParticle<IUser>({
        id: 'stanza',
        role: 'USER',
        username: 'stanza',
        firstName: 'Иван',
        lastName: 'Панкратов',
        email: 'va11no@yandex.ru',
        avatar: 'https://i.ibb.co/rfwfkbD/image.jpg',
    }),
};

/**
 * Головной редусер модуля авторизации.
 */
const reducer: TCoreAuthSettingsMappedReducer = (
    prevState = CoreAuthSettingsInitialState,
    action
): ICoreAuthSettingsState => ({
    user: reduceReducers(prevState.user)(prevState.user, action),
});

export const CoreAuthSettingsMappedReducer: ICoreAuthSettingsMappedReducer = {coreAuthSettings: reducer};
