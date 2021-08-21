import type {IUser} from '@debate/common/src/Models/User';
import type {IErrorsResult} from '@utils-npm/async-utils';
import {generateMockError} from '@utils-npm/axios-services';
import {getFullName, getJSONTodayDate} from '@utils-npm/helper-utils/src';
import {getParameterByName} from '@utils-npm/router-utils';
import {TThunkDispatch, dispatchAsyncResponseBound} from '@utils-npm/thunk-utils/src';
import {message} from 'antd';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {ROUTE} from 'Core/Const/RouterConst';
import {RouterUtils} from 'Core/Utils/RouterUtils';
import {ServiceWrapper} from 'Core/Utils/ServiceUtils';
import {
    AUTH_AUTHORIZATION_CHANGE_PASSWORD_URL,
    AUTH_AUTHORIZATION_CHECK_BY_COOKIE_URL,
    AUTH_AUTHORIZATION_LOG_IN_URL,
    AUTH_AUTHORIZATION_LOG_OUT_URL,
    AUTH_AUTHORIZATION_REGISTER_URL,
    AUTH_AUTHORIZATION_RESTORE_PASSWORD_URL,
    CORE_AUTH_SETTINGS_BASE_MOCK_URL,
    RETURN_TO_QUERY_PARAMETER_NAME,
} from '../../Const';
import type {IAuthData, ISignUpData} from '../../Models';
import {ActionTypes} from '../Actions/CoreAuthSettingsActionTypes';
import {userSelector} from '../Selectors/CoreAuthSettingsSelector';

/**
 * Модель экшнов модуля.
 */
interface IUseAuthorizationActions {
    checkAuth: () => Promise<IUser>;
    signUp: (signUpData: ISignUpData) => Promise<IUser>;
    signIn: (authData: IAuthData) => Promise<IUser>;
    restorePassword: (email: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
    logOut: () => Promise<void>;
}

export const useAuthorizationActions = (): IUseAuthorizationActions => {
    const dispatch: TThunkDispatch = useDispatch();
    const user = useSelector(userSelector);
    const {t} = useTranslation();

    /**
     * Экшн запрос на проверку авторизации клиента по токену в cookie.
     */
    const checkAuth = useCallback(
        () =>
            dispatchAsyncResponseBound<IUser>(
                dispatch,
                ActionTypes.CORE_AUTH_SETTINGS_AUTH_CHECK,
                ServiceWrapper.GET({
                    source: {
                        url: AUTH_AUTHORIZATION_CHECK_BY_COOKIE_URL,
                        mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}User.json`,
                    },
                    serviceMockDelay: true,
                    // Вернуть код можно для проверки выброса из логин зоны
                    mockCallbackServiceSimulator: (response) => {
                        // eslint-disable-next-line no-throw-literal
                        if (Math.random() < 0.7) {
                            generateMockError({
                                timestamp: getJSONTodayDate(),
                                uniqueCode: 'INVALID_AUTH_TOKEN',
                                errorStatus: 'Internal server error',
                                systemMessage: 'python error drop table row',
                                clientMessage: 'Пользователь не авторизован',
                            });
                        }

                        return response;
                    },
                })
            ),
        [dispatch]
    );

    /**
     * Экшн запрос на регистрацию пользователя.
     *
     * @param signUpData Объект с данными пользователя.
     */
    const signUp = useCallback(
        (signUpData: ISignUpData): Promise<IUser> =>
            dispatchAsyncResponseBound<IUser>(
                dispatch,
                ActionTypes.CORE_AUTH_SETTINGS_SIGN_UP,
                ServiceWrapper.POST({
                    source: {
                        url: AUTH_AUTHORIZATION_REGISTER_URL,
                        mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}user.json`,
                    },
                    data: {
                        ...signUpData,
                        username: 'stanzzza',
                    },
                    serviceMockDelay: true,
                })
            ).catch((error: IErrorsResult) => {
                message.error(error.errorStatus || t('Unauthorized.Registration.error.message'));

                throw error;
            }),
        [dispatch, t]
    );

    /**
     * Экшн запрос на авторизацию.
     *
     * @param authData Объект с данными пользователя.
     */
    const signIn = useCallback(
        (authData: IAuthData) => {
            const returnToURL: string = getParameterByName({
                name: RETURN_TO_QUERY_PARAMETER_NAME,
                currentUrl: RouterUtils.location().search,
            });

            return dispatchAsyncResponseBound<IUser>(
                dispatch,
                ActionTypes.CORE_AUTH_SETTINGS_SIGN_IN,
                ServiceWrapper.POST({
                    source: {
                        url: AUTH_AUTHORIZATION_LOG_IN_URL,
                        mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}Users.json`,
                    },
                    data: authData,
                    serviceMockDelay: true,
                    mockCallbackServiceSimulator: (users) => {
                        const foundedUser = ((users as unknown) as IUser[]).find((u) => u.email === authData.login);

                        if (!foundedUser)
                            // eslint-disable-next-line no-throw-literal
                            throw generateMockError(
                                {
                                    timestamp: getJSONTodayDate(),
                                    uniqueCode: '666',
                                    errorStatus: 'Не найдено',
                                    systemMessage: 'Такой пользователь не найден',
                                    clientMessage: `Пользователь с почтой ${authData.login} не найден`,
                                },
                                400
                            );

                        return foundedUser;
                    },
                })
            )
                .catch((error) => {
                    if (error.httpCode === 403) {
                        message.error(t('Unauthorized.Authorization.error.message'));
                    }

                    throw error;
                })
                .then((responseUser) => {
                    message.success(
                        t('Unauthorized.Authorization.successful.message', {
                            username: getFullName(responseUser) || t('Common.emptyPerson'),
                        })
                    );

                    const redirectPath = returnToURL || ROUTE.CLIENT.ACCOUNT.PATH;
                    if (redirectPath !== RouterUtils.location().pathname) {
                        RouterUtils.redirect(redirectPath);
                    }

                    return responseUser;
                });
        },
        [dispatch, t]
    );

    /**
     * Экшн выход из системы.
     */
    const logOut = useCallback((): Promise<void> => {
        const currentPath = RouterUtils.location().pathname;

        return dispatchAsyncResponseBound<void>(
            dispatch,
            ActionTypes.CORE_AUTH_SETTINGS_LOG_OUT,
            ServiceWrapper.POST({
                source: {
                    url: AUTH_AUTHORIZATION_LOG_OUT_URL,
                    mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}Void.json`,
                },
                data: null,
                serviceMockDelay: true,
            })
        ).then(() => {
            RouterUtils.redirect(ROUTE.UNAUTHORIZED.AUTHORIZATION.PATH, {
                search: `${RETURN_TO_QUERY_PARAMETER_NAME}=${encodeURIComponent(currentPath)}`,
            });
        });
    }, [dispatch]);

    /**
     * Экшн запрос на восстановление пароля.
     *
     * @param email Почта для восстановления.
     */
    const restorePassword = useCallback(
        (email: string) =>
            dispatchAsyncResponseBound<IUser>(
                dispatch,
                ActionTypes.CORE_AUTH_SETTINGS_RESTORE_PASSWORD,
                ServiceWrapper.POST({
                    source: {
                        url: AUTH_AUTHORIZATION_RESTORE_PASSWORD_URL,
                        mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}Void.json`,
                    },
                    data: {
                        email,
                    },
                    serviceMockDelay: true,
                })
            ).then(() => {
                message.success(t('Unauthorized.RestorePassword.Successful.message', {email: email?.toLowerCase()}));
            }),
        [dispatch, t]
    );

    /**
     * Экшн запрос на смену пароля.
     *
     * @param password Старый пароль.
     * @param newPassword Новый пароль.
     */
    const changePassword = useCallback(
        (password: string, newPassword: string) =>
            dispatchAsyncResponseBound<IUser>(
                dispatch,
                ActionTypes.CORE_AUTH_SETTINGS_CHANGE_PASSWORD,
                ServiceWrapper.POST({
                    source: {
                        url: AUTH_AUTHORIZATION_CHANGE_PASSWORD_URL,
                        mock: `${CORE_AUTH_SETTINGS_BASE_MOCK_URL}Void.json`,
                    },
                    data: {password, newPassword},
                    serviceMockDelay: true,
                    mockCallbackServiceSimulator: () => ({
                        ...user,
                        transport: false,
                    }),
                })
            ).then(() => {
                message.success(t('Unauthorized.ChangePassword.Successful.message'));
            }),
        [dispatch, t, user]
    );

    return {
        checkAuth,
        signUp,
        signIn,
        logOut,
        restorePassword,
        changePassword,
    };
};
