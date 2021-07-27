import {asyncDataLoadingOrIdle} from '@utils-npm/async-utils';
import type {IAppState} from 'Core/Models/AppStoreModels';
import type {IUser} from '@debate/common/src/Models/User';

/**
 * Модель селектора пользователя.
 */
export interface IUserSelector {
    isLoading: boolean;
    user: IUser;
}

/**
 * Селектор данных пользователя.
 */
export const userSelector = ({coreAuthSettings}: IAppState): IUserSelector => ({
    user: coreAuthSettings.user.data,
    isLoading: asyncDataLoadingOrIdle(coreAuthSettings.user),
});
