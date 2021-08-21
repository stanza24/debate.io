import type {IUser} from '@debate/common/src/Models/User';
import {asyncDataLoadingOrIdle} from '@utils-npm/async-utils';
import type {IAppState} from 'Core/Models/AppStoreModels';

/**
 * Селектор данных пользователя.
 */
export const userSelector = ({coreAuthSettings}: IAppState): IUser => coreAuthSettings.user.data;

/**
 * Селектор статуса загрузки пользователя.
 */
export const userLoadingSelector = ({coreAuthSettings}: IAppState): boolean =>
    asyncDataLoadingOrIdle(coreAuthSettings.user);
