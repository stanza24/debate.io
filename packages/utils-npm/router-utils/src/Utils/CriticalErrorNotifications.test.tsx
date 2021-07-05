import {
    ICallbackShowNotificationProps,
    createCriticalErrorNotificationsDemonstrator,
} from './CriticalErrorNotificationsUtils';

type TSimpleError = {
    timestamp: string;
    clientMessage: string;
};

describe('createCriticalErrorNotificationsDemonstrator', () => {
    // Путь до предполагаемой начальной страницы
    const baseUrl = '/base-url-string/';
    // Колбек показа нотификации
    const jestCallbackShowNotification = jest.fn((prop: ICallbackShowNotificationProps<TSimpleError>) => prop);

    const RouterUtils = {
        redirect: jest.fn(),
        reload: jest.fn(),
        isRouteActive: jest.fn(),
        location: jest.fn(),
    };

    const notificationSingleton = createCriticalErrorNotificationsDemonstrator<TSimpleError>({
        baseUrl,
        routerUtils: RouterUtils,
        callbackShowNotification: jestCallbackShowNotification,
    });

    it('createCriticalErrorNotificationsDemonstrator Тест 1 - При закрытии нотификации с результатом true, должен быть осуществлён redirect на базовую страницу', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        const jestTestError: TSimpleError = {
            timestamp: Date.now().toString(),
            clientMessage: 'jest test message',
        };

        notificationSingleton({
            error: jestTestError,
        });

        // В колбек показа нотификации должна быть передан массив ошибок, среди которых должна быть ошибка переданная в синглтон
        expect(jestCallbackShowNotification.mock.calls[0][0].errors).toStrictEqual([jestTestError]);

        // Показ нотификации должен быть вызван 1 раз
        expect(jestCallbackShowNotification).toHaveBeenCalledTimes(1);

        // Редирект не должен быть вызван
        expect(RouterUtils.redirect).toHaveBeenCalledTimes(0);

        // Закрываем нотификацию с результатом true
        jestCallbackShowNotification.mock.calls[0][0].callbackCloseNotification(true);

        // После закрытия нотификации, должен быть вызван редирект
        expect(RouterUtils.redirect).toHaveBeenCalledTimes(1);

        // Редирект должен быть вызван с базовым url
        expect(RouterUtils.redirect.mock.calls[0][0]).toStrictEqual(baseUrl);
    });
});
